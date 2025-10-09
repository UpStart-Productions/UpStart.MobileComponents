import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'share-sheet',
    loadComponent: () => import('./share-sheet/share-sheet.page').then((m) => m.ShareSheetPage),
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
