import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'feature1',
    loadComponent: () => import('./feature1/feature1.page').then((m) => m.Feature1Page),
  },
  {
    path: 'feature2',
    loadComponent: () => import('./feature2/feature2.page').then((m) => m.Feature2Page),
  },
  {
    path: 'feature3',
    loadComponent: () => import('./feature3/feature3.page').then((m) => m.Feature3Page),
  },
  {
    path: 'feature4',
    loadComponent: () => import('./feature4/feature4.page').then((m) => m.Feature4Page),
  },
  {
    path: 'feature5',
    loadComponent: () => import('./feature5/feature5.page').then((m) => m.Feature5Page),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
