import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-date-scroller',
  templateUrl: 'date-scroller.component.html',
  styleUrls: ['date-scroller.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DateScrollerComponent implements OnInit, OnDestroy {
  @ViewChild('dateScroller', { static: false }) dateScroller!: ElementRef;
  public completionDates: string[] = [];

  @Input() exercisesCompleted: string = '';
  @Input() set completedDates(dates: string[]) {
    this.completionDates = dates || [];
  }
  
  @Output() dateSelectedEvent = new EventEmitter<any>();
  dates: any = [];
  refreshed: boolean = false;

  constructor() {}

  selectDate(date: any) {
    this.dates.forEach((dateObj: any) => {
      dateObj.isSelected = false;
    });
    date.isSelected = true;
    this.dateSelectedEvent.emit(date);
  }

  calculateDateRange() {
    const dateEnd = moment().add(7, 'days'); // Today + 1 week.
    const dateStart = moment().subtract(2, 'months'); // 2 months ago

    if ( this.dates.length > 0 ) {
      this.dates = [];
    }

    while (dateStart.isSameOrBefore(dateEnd)) { 
      let isToday = false;
      let isSelected = false;
      if (dateStart.isSame(moment(), 'day')) {
        isToday = true;
        isSelected = true;
      }
      let dateObj = {
        date: dateStart.format('YYYY-MM-DD'),
        dayName: dateStart.format('ddd'),
        dayNumber: dateStart.format('D'),
        month: dateStart.format('MMMM'),
        year: dateStart.format('YYYY'),
        isToday: isToday,
        isSelected: isSelected
      }; 
      this.dates.push(dateObj);
      dateStart.add(1, 'day');
    }
    this.dates.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date));
  } 

  refresh() { 
    this.refreshed = true;
    this.calculateDateRange(); 
  }

  scrollToCurrentDate() {
    const todayIndex = this.dates.findIndex((date: any) => moment(date.date).isSame(moment(), 'day'));
    if (todayIndex !== -1 && this.dateScroller?.nativeElement) {
      const dateElements = this.dateScroller.nativeElement.children;
      const todayElement = dateElements[todayIndex];
      const container = this.dateScroller.nativeElement;
      const containerWidth = container.clientWidth;
      const elementOffset = todayElement.offsetLeft;
      const elementWidth = todayElement.clientWidth;
  
      // Center today's date
      const scrollPosition = elementOffset - (containerWidth / 2) + (elementWidth / 2);
  
      // Smooth scrolling to the calculated position
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }  

  ngOnInit() {
    this.calculateDateRange();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToCurrentDate();
    }, 50);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}

