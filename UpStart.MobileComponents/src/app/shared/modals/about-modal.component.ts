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
  logoGithub 
} from 'ionicons/icons';

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
      logoGithub 
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
}

