import { Routes } from '@angular/router';
import { Leagalnotice } from './pages/leagalnotice/leagalnotice';
import { HomeRoute } from './pages/main-section/home-route';

export const routes: Routes = [
  { path: '', component: HomeRoute, pathMatch: 'full' },
  { path: 'impressum', component: Leagalnotice },
  { path: 'legal-notice', redirectTo: 'impressum', pathMatch: 'full' },
];
