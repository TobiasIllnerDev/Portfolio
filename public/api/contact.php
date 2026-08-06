<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function letterCount(string $value): int
{
    return preg_match_all('/\p{L}/u', $value) ?: 0;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 20_000) {
    respond(413, ['success' => false, 'error' => 'Request too large']);
}

try {
    $payload = json_decode(
        file_get_contents('php://input') ?: '',
        true,
        16,
        JSON_THROW_ON_ERROR
    );
} catch (JsonException) {
    respond(400, ['success' => false, 'error' => 'Invalid JSON']);
}

if (!is_array($payload)) {
    respond(400, ['success' => false, 'error' => 'Invalid request']);
}

$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$message = trim((string) ($payload['message'] ?? ''));
$privacyAccepted = ($payload['privacyPolicy'] ?? false) === true;
$honeypot = trim((string) ($payload['website'] ?? ''));

// Bots often fill every field. Return success without sending a message.
if ($honeypot !== '') {
    respond(200, ['success' => true]);
}

if (
    textLength($name) < 2 || textLength($name) > 100 ||
    letterCount($name) < 2 ||
    preg_match('~https?://|www\.~i', $name)
) {
    respond(422, ['success' => false, 'error' => 'Invalid name', 'field' => 'name']);
}

if (textLength($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['success' => false, 'error' => 'Invalid email', 'field' => 'email']);
}

$emailDomain = strtolower((string) substr(strrchr($email, '@') ?: '', 1));
if (
    $emailDomain === '' ||
    !str_contains($emailDomain, '.') ||
    (!checkdnsrr($emailDomain, 'MX') && !checkdnsrr($emailDomain, 'A'))
) {
    respond(422, [
        'success' => false,
        'error' => 'Email domain does not exist',
        'field' => 'email',
        'reason' => 'domain',
    ]);
}

$linkCount = preg_match_all('~(?:https?://|www\.)~i', $message) ?: 0;
if (
    textLength($message) < 20 || textLength($message) > 5_000 ||
    letterCount($message) < 10 ||
    preg_match('/(\S)\1{9,}/u', $message) ||
    $linkCount > 3
) {
    respond(422, ['success' => false, 'error' => 'Invalid message', 'field' => 'message']);
}

if (!$privacyAccepted) {
    respond(422, ['success' => false, 'error' => 'Privacy policy not accepted', 'field' => 'privacyPolicy']);
}

$recipient = 'tobias.illner@hotmail.de';
$sender = 'webmaster@tobias-illner.de';
$subject = 'Neue Nachricht ueber tobias-illner.de';

$mailBody = implode("\r\n", [
    'Name: ' . $name,
    'E-Mail: ' . $email,
    '',
    'Nachricht:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'From: Website Kontakt <' . $sender . '>',
    'Reply-To: ' . $email,
];

$success = mail(
    $recipient,
    $subject,
    $mailBody,
    implode("\r\n", $headers),
    '-f ' . $sender
);

if (!$success) {
    error_log('Contact form: mail() returned false.');
    respond(500, ['success' => false, 'error' => 'Mail delivery failed']);
}

respond(200, ['success' => true]);
