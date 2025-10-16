import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { QuillFloatingToolbarComponent } from './rich-text-editor/components/quill-floating-toolbar.component';
import { CoinAnimationComponent } from './gamification/components/coin-animation.component';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { DatabaseBaseService } from './sqlite-demo/services/database-base.service';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

import {
  addCircleOutline,
  addOutline,
  arrowBack,
  arrowBackOutline,
  attachOutline,
  bodyOutline,
  bookmarksOutline,
  bookOutline,
  bug,
  bugOutline,
  buildOutline,
  calendarOutline,
  cameraOutline,
  callOutline,
  chatboxEllipsesOutline,
  checkmark,
  checkmarkCircle,
  checkmarkCircleOutline,
  chevronBack,
  chevronBackCircleOutline,
  chevronBackOutline,
  chevronDown,
  chevronDownOutline,
  chevronForward,
  chevronForwardCircleOutline,
  chevronForwardOutline,
  chatbubbleOutline,
  closeCircle,
  closeCircleOutline,
  closeOutline,
  cloudOutline,
  cloudDownloadOutline,
  construct,
  constructOutline,
  createOutline,
  documentOutline,
  documentTextOutline,
  eyeOffOutline,
  eyeOutline,
  fishOutline,
  fitness,
  fitnessOutline,
  flame,
  flashOutline,
  flowerOutline,
  folderOutline,
  footsteps,
  footstepsOutline,
  globeOutline,
  heartOutline,
  helpBuoy,
  helpBuoyOutline,
  helpCircleOutline,
  home,
  homeOutline,
  imageOutline,
  imagesOutline,
  information,
  journalOutline,
  keyOutline,
  layersOutline,
  leafOutline,
  libraryOutline,
  linkOutline,
  list,
  listCircleOutline,
  listOutline,
  lockClosedOutline,
  logoAndroid,
  logoApple,
  logoYoutube,
  mailOutline,
  micOutline,
  moonOutline,
  musicalNoteOutline,
  musicalNotesOutline,
  notificationsOutline,
  pauseCircleOutline,
  people,
  peopleOutline,
  phonePortraitOutline,
  pieChartOutline,
  playCircleOutline,
  rainyOutline,
  refresh,
  refreshCircle,
  ribbon,
  ribbonOutline,
  sadOutline,
  saveOutline,
  search,
  send,
  settingsOutline,
  shareOutline,
  shieldOutline,
  shieldCheckmarkOutline,
  snowOutline,
  sparklesOutline,
  starOutline,
  stopCircle,
  stopCircleOutline,
  sunnyOutline,
  textOutline,
  timeOutline,
  trashOutline,
  trophyOutline,
  waterOutline,
  colorPaletteOutline,
  happyOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, QuillFloatingToolbarComponent, CoinAnimationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private dbBase: DatabaseBaseService
  ) {}

  ngOnInit() {
    this.initializeApp();
    
    // Register all Ionic icons globally
    addIcons({
      addCircleOutline,
      addOutline,
      arrowBack,
      arrowBackOutline,
      attachOutline,
      bodyOutline,
      bookmarksOutline,
      bookOutline,
      bug,
      bugOutline,
      buildOutline,
      calendarOutline,
      cameraOutline,
      callOutline,
      chatbubbleOutline,
      chatboxEllipsesOutline,
      checkmark,
      checkmarkCircle,
      checkmarkCircleOutline,
      chevronBack,
      chevronBackCircleOutline,
      chevronBackOutline,
      chevronDown,
      chevronDownOutline,
      chevronForward,
      chevronForwardCircleOutline,
      chevronForwardOutline,
      closeCircle,
      closeCircleOutline,
      closeOutline,
      cloudOutline,
      cloudDownloadOutline,
      construct,
      constructOutline,
      createOutline,
      documentOutline,
      documentTextOutline,
      eyeOffOutline,
      eyeOutline,
      fishOutline,
      fitness,
      fitnessOutline,
      flame,
      flashOutline,
      flowerOutline,
      folderOutline,
      footsteps,
      footstepsOutline,
      globeOutline,
      heartOutline,
      helpBuoy,
      helpBuoyOutline,
      helpCircleOutline,
      home,
      homeOutline,
      imageOutline,
      imagesOutline,
      information,
      journalOutline,
      keyOutline,
      layersOutline,
      leafOutline,
      libraryOutline,
      linkOutline,
      list,
      listCircleOutline,
      listOutline,
      lockClosedOutline,
      logoAndroid,
      logoApple,
      logoYoutube,
      mailOutline,
      micOutline,
      moonOutline,
      musicalNoteOutline,
      musicalNotesOutline,
      notificationsOutline,
      pauseCircleOutline,
      people,
      peopleOutline,
      phonePortraitOutline,
      pieChartOutline,
      playCircleOutline,
      rainyOutline,
      refresh,
      refreshCircle,
      ribbon,
      ribbonOutline,
      sadOutline,
      saveOutline,
      search,
      send,
      settingsOutline,
      shareOutline,
      shieldOutline,
      shieldCheckmarkOutline,
      snowOutline,
      sparklesOutline,
      starOutline,
      stopCircle,
      stopCircleOutline,
      sunnyOutline,
      textOutline,
      timeOutline,
      trashOutline,
      trophyOutline,
      waterOutline,
      colorPaletteOutline,
      happyOutline,
      // Custom icons
      'logo-spotify': './assets/custom-icons/logo-spotify.svg',
      'bar-chart1': './assets/custom-icons/bar-chart1.svg',
      'donut-chart1': './assets/custom-icons/donut-chart1.svg',
      'list1': './assets/custom-icons/list1.svg',
      'editor-ol': './assets/custom-icons/editor-ol.svg',
      'award': './assets/custom-icons/award.svg',
    });
  }

  async initializeApp() {
    await this.platform.ready();
    
    // Initialize SQLite for web platform
    if (!this.platform.is('capacitor')) {
      console.log('🌐 Initializing SQLite for web...');
      jeepSqlite(window);
      const jeepEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      console.log('✅ jeep-sqlite web component ready');
    }
    
    // Initialize SQLite database
    try {
      console.log('🗄️ Initializing SQLite database...');
      await this.dbBase.initializePlugin();
      console.log('✅ SQLite database initialized');
    } catch (error) {
      console.error('❌ Failed to initialize SQLite:', error);
    }
    
    if (this.platform.is('capacitor')) {
      // Hide the splash screen after the app is ready
      await SplashScreen.hide();
      
      // Configure the status bar
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }
}
