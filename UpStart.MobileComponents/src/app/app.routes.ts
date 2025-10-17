import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then((m) => m.IntroPage),
  },
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
    path: 'widgets/number-flipper',
    loadComponent: () => import('./widgets/number-flipper/number-flipper-demo.page').then((m) => m.NumberFlipperDemoPage),
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
    path: 'date-widgets/date-scroller',
    loadComponent: () => import('./date-widgets/date-scroller/date-scroller-demo.page').then((m) => m.DateScrollerDemoPage),
  },
  {
    path: 'form-widgets',
    loadComponent: () => import('./form-widgets/form-widgets.page').then((m) => m.FormWidgetsPage),
  },
  {
    path: 'form-widgets/color-picker',
    loadComponent: () => import('./form-widgets/color-picker/color-picker-demo.page').then((m) => m.ColorPickerDemoPage),
  },
  {
    path: 'form-widgets/weekday-picker',
    loadComponent: () => import('./form-widgets/weekday-picker/weekday-picker-demo.page').then((m) => m.WeekdayPickerDemoPage),
  },
  {
    path: 'charts',
    loadComponent: () => import('./charts/charts.page').then((m) => m.ChartsPage),
  },
  {
    path: 'charts/progress-line-chart',
    loadComponent: () => import('./charts/progress-line-chart/progress-line-chart-demo.page').then((m) => m.ProgressLineChartDemoPage),
  },
  {
    path: 'widgets/button-bar',
    loadComponent: () => import('./widgets/button-bar/button-bar-demo.page').then((m) => m.ButtonBarDemoPage),
  },
  {
    path: 'widgets/tabs-fab',
    loadComponent: () => import('./widgets/tabs-fab/tabs-fab-demo.page').then((m) => m.TabsFabDemoPage),
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
    redirectTo: 'intro',
    pathMatch: 'full',
  },
];
