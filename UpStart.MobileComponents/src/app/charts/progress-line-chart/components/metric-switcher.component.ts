import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonRow, IonSelect, IonSelectOption, IonIcon } from '@ionic/angular/standalone';
import { NumberFlipperComponent } from './number-flipper.component';

@Component({
  selector: 'app-metric-switcher',
  templateUrl: 'metric-switcher.component.html',
  styleUrls: ['metric-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule, IonSelect, IonRow, IonCol, IonSelectOption, NumberFlipperComponent, FormsModule, IonIcon]
})
export class MetricSwitcherComponent {
  @Input() metric: string = 'weight';
  @Input() total: number = 0;
  @Input() percentageChange: number = 0;
  @Input() percentageChangeDirection: string = 'up';
  @Output() metricSelectedEvent = new EventEmitter<string>(); 

  metricLabel: string = '';
  arrowIcon = 'arrow-up-outline';

  constructor() {}

  ngOnInit() {
    this.onMetricChange(this.metric);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( this.percentageChangeDirection === 'down' ) {
      this.arrowIcon = 'arrow-down-outline';
    } else if ( this.percentageChangeDirection === 'up' ) {
      this.arrowIcon = 'arrow-up-outline';
    } else {
      this.arrowIcon = 'remove-outline';
    }
  }

  onMetricChange(metric: string) {
    switch (metric) {
      case 'weight':
        this.metricLabel = 'lbs'; // Hardcoded for demo
        break;
      case 'volume':
        this.metricLabel = 'k';
        break;
      case 'distance':
        this.metricLabel = 'mi'; // Hardcoded for demo
        break;
      case 'duration':
        this.metricLabel = 'min';
        break;
      }  
    this.metric = metric;
    this.metricSelectedEvent.emit(metric);
  }
}

