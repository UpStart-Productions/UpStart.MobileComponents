import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, shareOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class IntroPage {
  constructor(private router: Router) {
    addIcons({ arrowForwardOutline, shareOutline });
  }

  navigateToShowcase() {
    this.router.navigate(['/home']);
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

