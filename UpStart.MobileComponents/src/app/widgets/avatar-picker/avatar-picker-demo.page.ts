import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonText,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, checkmarkCircleOutline, imagesOutline } from 'ionicons/icons';
import { AvatarPickerComponent } from './avatar-picker.component';

@Component({
  selector: 'app-avatar-picker-demo',
  templateUrl: './avatar-picker-demo.page.html',
  styleUrls: ['./avatar-picker-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonText,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    AvatarPickerComponent
  ]
})
export class AvatarPickerDemoPage {
  // Event log
  eventLog: string[] = [];

  // Selected avatar
  selectedAvatar: string = 'assets/images/avatars/avatar-5.png';

  constructor() {
    addIcons({ personCircleOutline, checkmarkCircleOutline, imagesOutline });
  }

  onAvatarSelected(avatarPath: string) {
    this.selectedAvatar = avatarPath;
    const avatarNumber = avatarPath.match(/avatar-(\d+)/)?.[1] || '?';
    this.logEvent(`Avatar ${avatarNumber} selected`);
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

