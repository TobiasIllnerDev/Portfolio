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
    strlen($name) < 2 || strlen($name) > 100 ||
    strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($message) < 10 || strlen($message) > 5_000 ||
    !$privacyAccepted
) {
    respond(422, ['success' => false, 'error' => 'Invalid input data']);
}

$recipient = 'tobias.illner@hotmail.de';
$sender = 'website@tobias-illner.de';
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
