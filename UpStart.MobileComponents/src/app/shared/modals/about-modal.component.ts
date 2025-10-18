import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  closeOutline, 
  mailOutline, 
  globeOutline, 
  logoLinkedin, 
  logoTwitter, 
  logoGithub,
  shareOutline
} from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class AboutModalComponent {
  constructor(private modalCtrl: ModalController) {
    addIcons({ 
      closeOutline, 
      mailOutline, 
      globeOutline, 
      logoLinkedin, 
      logoTwitter, 
      logoGithub,
      shareOutline
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async openEmail() {
    // Opens default email app with pre-filled address
    window.location.href = 'mailto:hello@heyupstart.com';
  }

  async openWebsite() {
    await Browser.open({ url: 'https://heyupstart.com' });
  }

  async openLinkedIn() {
    await Browser.open({ url: 'https://www.linkedin.com/in/chiefupstart/' });
  }

  async openTwitter() {
    // Placeholder for future use
    console.log('Open Twitter');
  }

  async openGitHub() {
    await Browser.open({ url: 'https://github.com/upstart-productions' });
  }

  async shareApp() {
    try {
      await Share.share({
        title: 'UpStart Mobile Components',
        text: 'Check out this amazing collection of production-ready Ionic & Angular components! Perfect for accelerating mobile app development.',
        url: 'https://github.com/upstart-productions/UpStart.MobileComponents',
        dialogTitle: 'Share UpStart Components'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
}

