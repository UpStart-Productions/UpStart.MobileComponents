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

  openEmail() {
    // Placeholder - will be implemented with actual email
    console.log('Open email');
  }

  openWebsite() {
    // Placeholder - will be implemented with actual URL
    console.log('Open website');
  }

  openLinkedIn() {
    // Placeholder
    console.log('Open LinkedIn');
  }

  openTwitter() {
    // Placeholder
    console.log('Open Twitter');
  }

  openGitHub() {
    // Placeholder
    console.log('Open GitHub');
  }

  async shareApp() {
    try {
      await Share.share({
        title: 'UpStart Mobile Components',
        text: 'Check out this amazing collection of production-ready Ionic & Angular components! Perfect for accelerating mobile app development.',
        url: 'https://github.com/upstart-productions/mobile-components',
        dialogTitle: 'Share UpStart Components'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
}

