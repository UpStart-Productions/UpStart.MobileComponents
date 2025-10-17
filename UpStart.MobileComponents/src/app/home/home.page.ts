import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonListHeader, 
  IonItem, 
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { AboutModalComponent } from '../shared/modals/about-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonItem, 
    IonLabel,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon
  ],
})
export class HomePage {
  constructor(private modalCtrl: ModalController) {
    addIcons({ informationCircleOutline });
  }

  async presentAboutModal() {
    const modal = await this.modalCtrl.create({
      component: AboutModalComponent
    });
    await modal.present();
  }
}
