import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-feature5',
  templateUrl: './feature5.page.html',
  styleUrls: ['./feature5.page.scss'],
  imports: [
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonBackButton
  ],
})
export class Feature5Page {
  constructor() {}
}

