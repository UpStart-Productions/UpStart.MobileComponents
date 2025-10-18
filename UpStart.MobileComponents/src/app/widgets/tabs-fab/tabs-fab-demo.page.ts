import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonList,
  IonItem,
  IonChip,
  ActionSheetController,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  personOutline,
  person,
  settingsOutline,
  settings,
  gridOutline,
  grid,
  addOutline,
  journalOutline,
  checkmarkCircleOutline,
  moonOutline,
  flowerOutline,
  chatbubbleOutline,
  closeOutline,
  notificationsOutline,
  bookmarkOutline,
  heartOutline,
  appsOutline,
  addCircleOutline,
  swapHorizontalOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs-fab-demo',
  templateUrl: './tabs-fab-demo.page.html',
  styleUrls: ['./tabs-fab-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonFab,
    IonFabButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonList,
    IonItem,
    IonChip
  ]
})
export class TabsFabDemoPage implements OnInit {
  selectedTab: string = 'home';
  fabClickCount: number = 0;
  eventLog: string[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {
    addIcons({
      homeOutline,
      home,
      personOutline,
      person,
      settingsOutline,
      settings,
      gridOutline,
      grid,
      addOutline,
      journalOutline,
      checkmarkCircleOutline,
      moonOutline,
      flowerOutline,
      chatbubbleOutline,
      closeOutline,
      notificationsOutline,
      bookmarkOutline,
      heartOutline,
      appsOutline,
      addCircleOutline,
      swapHorizontalOutline
    });
  }

  ngOnInit() {}

  onTabClick(tab: string) {
    this.selectedTab = tab;
    this.logEvent(`Tab selected: ${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  }

  async openQuickActions() {
    this.fabClickCount++;
    this.logEvent(`FAB clicked (click #${this.fabClickCount})`);

    const actionSheet = await this.actionSheetController.create({
      header: 'Quick Actions',
      buttons: [
        {
          text: 'Create Note',
          icon: 'journal-outline',
          handler: () => {
            this.showActionMessage('Create Note');
          }
        },
        {
          text: 'Add Task',
          icon: 'checkmark-circle-outline',
          handler: () => {
            this.showActionMessage('Add Task');
          }
        },
        {
          text: 'Set Reminder',
          icon: 'notifications-outline',
          handler: () => {
            this.showActionMessage('Set Reminder');
          }
        },
        {
          text: 'Add Bookmark',
          icon: 'bookmark-outline',
          handler: () => {
            this.showActionMessage('Add Bookmark');
          }
        },
        {
          text: 'Quick Favorite',
          icon: 'heart-outline',
          handler: () => {
            this.showActionMessage('Quick Favorite');
          }
        },
        {
          text: 'Send Message',
          icon: 'chatbubble-outline',
          handler: () => {
            this.showActionMessage('Send Message');
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async showActionMessage(action: string) {
    this.logEvent(`Quick action: ${action}`);
    
    const alert = await this.alertController.create({
      header: 'Action Selected',
      message: `You selected: ${action}\n\nIn a real app, this would open a modal or navigate to the appropriate page.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

