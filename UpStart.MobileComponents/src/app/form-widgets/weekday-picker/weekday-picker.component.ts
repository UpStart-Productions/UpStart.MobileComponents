import { 
  Component, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weekday-picker',
  templateUrl: 'weekday-picker.component.html',
  styleUrls: ['weekday-picker.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WeekdayPickerComponent {
  @Input() public label: string = 'Pick some weekdays'; 
  @Input() public weekdayOptions: any = {
    'Sunday': 'S',
    'Monday': 'M',
    'Tuesday': 'T',
    'Wednesday': 'W',
    'Thursday': 'T',
    'Friday': 'F',
    'Saturday': 'S'
  };

  @Input() public selectedWeekdays: any | null = null;  
  @Output() weekdaysSelectedEvent = new EventEmitter<any>();
  @Output() dirtyControlEvent = new EventEmitter<boolean>();

  public state: string = 'closed';
  
  constructor(){
  }

  toggleSelectedDay(day: any) {
    this.selectedWeekdays.find((weekday: any) => weekday.day === day.key).selected = 
      !this.selectedWeekdays.find((weekday: any) => weekday.day === day.key).selected;
    this.weekdaysSelectedEvent.emit(this.selectedWeekdays);
    this.dirtyControlEvent.emit(true);
  }

  selectEveryDay() {
    this.selectedWeekdays.forEach((day: any) => day.selected = true);
    this.weekdaysSelectedEvent.emit(this.selectedWeekdays);
    this.dirtyControlEvent.emit(true);
  }

  isEveryDaySelected() {
    return this.selectedWeekdays.every((day: any) => day.selected);
  }

  returnZero() {
    // Keeps our weekdayOptions from getting alpha sorted by keyvalue pipe.
    return 0;
  }

  ngOnInit() {
    if (this.selectedWeekdays === null || this.selectedWeekdays.length === 0 ) {
      this.selectedWeekdays = [
        { 'day': 'Sunday', 'selected': true },
        { 'day': 'Monday', 'selected': true },
        { 'day': 'Tuesday', 'selected': true },
        { 'day': 'Wednesday', 'selected': true },
        { 'day': 'Thursday', 'selected': true },
        { 'day': 'Friday', 'selected': true },
        { 'day': 'Saturday', 'selected': true }
      ];
    } 
    this.weekdaysSelectedEvent.emit(this.selectedWeekdays);
  }
}

