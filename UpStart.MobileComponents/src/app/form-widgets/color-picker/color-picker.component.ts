import { 
  Component, 
  Input, 
  Output, 
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-picker',
  templateUrl: 'color-picker.component.html',
  styleUrls: ['color-picker.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ColorPickerComponent {
  @Input() public config: any = [];
  @Input() public label: string = 'Pick a color'; 
  @Input() public selectedColor: string = 'prussian-blue';
  @Output() colorSelectedEvent = new EventEmitter<string>();
  @Output() dirtyControlEvent = new EventEmitter<boolean>();

  public state: string = 'closed';

  constructor(){}

  toggleOpenClose() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }

  selectColor(color: string, ev: any) {
    this.selectedColor = color;
    this.state = 'closed';
    ev.stopPropagation();
    this.colorSelectedEvent.emit(color);
    this.dirtyControlEvent.emit(true);
  }

  ngAfterViewInit() {
    if (this.selectedColor === '') {
      this.selectedColor = this.config[0].color;
    }
    this.colorSelectedEvent.emit(this.selectedColor);
  }
}

