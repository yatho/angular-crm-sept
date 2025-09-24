import { Routes } from '@angular/router';
import { authenticationGuard } from './login/authentication-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'consumer',
        loadComponent: () => import('./consumers/list/list').then((m) => m.List),
      },
      {
        path: 'consumer-fiche',
        loadComponent: () => import('./consumers/fiche/fiche').then((m) => m.Fiche),
      },
      {
        path: 'consumer-fiche/:id',
        loadComponent: () => import('./consumers/fiche/fiche').then((m) => m.Fiche),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
