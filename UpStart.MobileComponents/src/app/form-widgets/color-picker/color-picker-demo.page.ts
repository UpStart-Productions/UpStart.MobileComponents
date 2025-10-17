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
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { colorPaletteOutline, sparklesOutline, eyeOutline, flashOutline } from 'ionicons/icons';
import { ColorPickerComponent } from './color-picker.component';

@Component({
  selector: 'app-color-picker-demo',
  templateUrl: './color-picker-demo.page.html',
  styleUrls: ['./color-picker-demo.page.scss'],
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
    ColorPickerComponent
  ]
})
export class ColorPickerDemoPage {
  // Event log
  eventLog: string[] = [];

  // Example 1: Full color palette
  colorConfig1 = [
    { color: 'prussian-blue' },
    { color: 'blue-ribbon' },
    { color: 'picton-blue' },
    { color: 'emerald' },
    { color: 'red-orange' },
    { color: 'magenta' },
    { color: 'purple-heart' },
    { color: 'amethyst' },
    { color: 'sunshade' }
  ];
  selectedColor1: string = 'prussian-blue';

  // Example 2: Limited palette
  colorConfig2 = [
    { color: 'emerald' },
    { color: 'red-orange' },
    { color: 'magenta' },
    { color: 'purple-heart' }
  ];
  selectedColor2: string = 'emerald';

  // Example 3: Blues only
  colorConfig3 = [
    { color: 'prussian-blue' },
    { color: 'blue-ribbon' },
    { color: 'picton-blue' }
  ];
  selectedColor3: string = 'blue-ribbon';

  // Example 4: Real-time preview
  colorConfig4 = [
    { color: 'prussian-blue' },
    { color: 'blue-ribbon' },
    { color: 'picton-blue' },
    { color: 'emerald' },
    { color: 'red-orange' },
    { color: 'magenta' }
  ];
  selectedColor4: string = 'emerald';

  constructor() {
    addIcons({ colorPaletteOutline, sparklesOutline, eyeOutline, flashOutline });
  }

  onColor1Selected(color: string) {
    this.selectedColor1 = color;
    this.logEvent(`Full palette: Selected ${this.getColorName(color)}`);
  }

  onColor2Selected(color: string) {
    this.selectedColor2 = color;
    this.logEvent(`Limited palette: Selected ${this.getColorName(color)}`);
  }

  onColor3Selected(color: string) {
    this.selectedColor3 = color;
    this.logEvent(`Blues only: Selected ${this.getColorName(color)}`);
  }

  onColor4Selected(color: string) {
    this.selectedColor4 = color;
    this.logEvent(`Preview: Selected ${this.getColorName(color)}`);
  }

  getColorName(color: string): string {
    const names: any = {
      'prussian-blue': 'Prussian Blue',
      'blue-ribbon': 'Blue Ribbon',
      'picton-blue': 'Picton Blue',
      'emerald': 'Emerald',
      'red-orange': 'Red Orange',
      'magenta': 'Magenta',
      'purple-heart': 'Purple Heart',
      'amethyst': 'Amethyst',
      'sunshade': 'Sunshade'
    };
    return names[color] || color;
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

