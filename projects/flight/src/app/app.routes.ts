import { Routes } from '@angular/router';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./shared/feature-core')
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking')
  },
  {
    path: 'checkin',
    loadChildren: () => import('./checkin')
  },
  {
    path: 'luggage',
    loadChildren: () => import('./luggage')
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
