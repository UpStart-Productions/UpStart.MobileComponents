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
    path: 'widgets',
    loadComponent: () => import('./widgets/widgets.page').then((m) => m.WidgetsPage),
  },
  {
    path: 'widgets/feelings',
    loadComponent: () => import('./widgets/feelings/feelings-demo.page').then((m) => m.FeelingsDemoPage),
  },
  {
    path: 'widgets/step-card',
    loadComponent: () => import('./widgets/step-card/step-card-demo.page').then((m) => m.StepCardDemoPage),
  },
  {
    path: 'widgets/progress-ring',
    loadComponent: () => import('./widgets/progress-ring/progress-ring-demo.page').then((m) => m.ProgressRingDemoPage),
  },
  {
    path: 'widgets/avatar-picker',
    loadComponent: () => import('./widgets/avatar-picker/avatar-picker-demo.page').then((m) => m.AvatarPickerDemoPage),
  },
  {
    path: 'date-widgets',
    loadComponent: () => import('./date-widgets/date-widgets.page').then((m) => m.DateWidgetsPage),
  },
  {
    path: 'date-widgets/calendar',
    loadComponent: () => import('./date-widgets/calendar/calendar-demo.page').then((m) => m.CalendarDemoPage),
  },
  {
    path: 'widgets/button-bar',
    loadComponent: () => import('./widgets/button-bar/button-bar-demo.page').then((m) => m.ButtonBarDemoPage),
  },
  {
    path: 'rich-text-editor',
    loadComponent: () => import('./rich-text-editor/rich-text-editor-demo.page').then((m) => m.RichTextEditorDemoPage),
  },
  {
    path: 'gamification',
    loadComponent: () => import('./gamification/gamification-demo.page').then((m) => m.GamificationDemoPage),
  },
  {
    path: 'pdf-export',
    loadComponent: () => import('./pdf-export/pdf-export-demo.page').then((m) => m.PdfExportDemoPage),
  },
  {
    path: 'video-header',
    loadComponent: () => import('./video-header/video-header-demo.page').then((m) => m.VideoHeaderDemoPage),
  },
  {
    path: 'sqlite-demo',
    loadComponent: () => import('./sqlite-demo/sqlite-demo.page').then((m) => m.SqliteDemoPage),
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
