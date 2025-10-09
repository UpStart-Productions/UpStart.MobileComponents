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
  selector: 'app-feature1',
  templateUrl: './feature1.page.html',
  styleUrls: ['./feature1.page.scss'],
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
export class Feature1Page {
  constructor() {}
}

