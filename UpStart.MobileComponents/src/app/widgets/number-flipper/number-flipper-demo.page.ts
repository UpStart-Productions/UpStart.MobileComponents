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
  IonButton,
  IonRange
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flashOutline, resizeOutline, trendingUpOutline, timerOutline } from 'ionicons/icons';
import { NumberFlipperComponent } from './number-flipper.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-flipper-demo',
  templateUrl: './number-flipper-demo.page.html',
  styleUrls: ['./number-flipper-demo.page.scss'],
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
    IonButton,
    IonRange,
    NumberFlipperComponent,
    FormsModule
  ]
})
export class NumberFlipperDemoPage {
  // Example 1: Basic counter
  counter1: number = 0;

  // Example 2: Large numbers (auto-formats to K)
  counter2: number = 1500;

  // Example 3: Custom digit height
  counter3: number = 42;
  digitHeight: number = 60;

  // Example 4: Real-time counter
  counter4: number = 0;
  isRunning: boolean = false;
  intervalId: any;

  constructor() {
    addIcons({ flashOutline, resizeOutline, trendingUpOutline, timerOutline });
  }

  incrementCounter1() {
    this.counter1++;
  }

  decrementCounter1() {
    if (this.counter1 > 0) this.counter1--;
  }

  resetCounter1() {
    this.counter1 = 0;
  }

  incrementCounter2By100() {
    this.counter2 += 100;
  }

  decrementCounter2By100() {
    if (this.counter2 >= 100) this.counter2 -= 100;
  }

  randomCounter2() {
    this.counter2 = Math.floor(Math.random() * 9999);
  }

  toggleCounter4() {
    this.isRunning = !this.isRunning;
    
    if (this.isRunning) {
      this.intervalId = setInterval(() => {
        this.counter4++;
        if (this.counter4 >= 999) {
          this.stopCounter4();
        }
      }, 50);
    } else {
      this.stopCounter4();
    }
  }

  stopCounter4() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetCounter4() {
    this.stopCounter4();
    this.counter4 = 0;
  }

  ngOnDestroy() {
    this.stopCounter4();
  }
}

