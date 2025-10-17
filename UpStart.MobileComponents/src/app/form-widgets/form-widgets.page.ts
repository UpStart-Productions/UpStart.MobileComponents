import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { AboutModalComponent } from '../shared/modals/about-modal.component';

@Component({
  selector: 'app-form-widgets',
  templateUrl: './form-widgets.page.html',
  styleUrls: ['./form-widgets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    RouterLink
  ]
})
export class FormWidgetsPage {
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

