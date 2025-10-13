import { Component, EventEmitter, Input, Output, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButton, IonPopover } from '@ionic/angular/standalone';
import moment from 'moment';

/**
 * Calendar Widget Component
 * 
 * A beautiful, fully-featured calendar component with month/year navigation,
 * date selection, and customizable styling. Features a popover year picker
 * and support for disabled dates, completed dates, and selected dates.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <app-calendar
 *   [selectedDate]="myDate"
 *   (dateSelected)="onDateSelected($event)">
 * </app-calendar>
 * 
 * <!-- With max date and completed dates -->
 * <app-calendar
 *   [selectedDate]="sobrietyDate"
 *   [maxDate]="today"
 *   [completedDates]="completedDays"
 *   (dateSelected)="handleDateChange($event)">
 * </app-calendar>
 * ```
 */
@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonIcon,
    IonButton,
    IonPopover
  ],
})
export class CalendarComponent implements OnInit, OnChanges {
  /** Array of dates marked as completed (ISO format strings) */
  @Input() completedDates: string[] = [];
  
  /** Currently selected date (ISO format string or null) */
  @Input() selectedDate: string | null = null;
  
  /** Maximum selectable date (ISO format string or null) */
  @Input() maxDate: string | null = null;
  
  /** Additional attributes for customization */
  @Input() selectedAttributes: any;
  
  /** Emitted when month changes */
  @Output() changeMonthEvent = new EventEmitter<any>();
  
  /** Emitted when a date is selected */
  @Output() dateSelected = new EventEmitter<string>();

  currentMonth = moment();
  selectedYear = this.currentMonth.year();
  yearRange = this.getYearRange();
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  isYearPickerOpen = false;
  
  // Cache the days to avoid recalculation on every change detection
  private _daysInMonth: (moment.Moment | null)[] = [];
  private _lastMonthKey = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeToDate(this.selectedDate);
    this.updateDaysInMonth();
  }

  ngOnChanges() {
    this.initializeToDate(this.selectedDate);
    this.updateDaysInMonth();
  }

  /**
   * Initialize calendar to specific date or current month
   */
  private initializeToDate(dateString: string | null) {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        this.currentMonth = date.clone().startOf('month');
        this.selectedYear = this.currentMonth.year();
      }
    }
  }

  /**
   * Get array of days for current month
   * Includes empty slots for alignment
   */
  get daysInMonth(): (moment.Moment | null)[] {
    const monthKey = this.currentMonth.format('YYYY-MM');
    
    // Return cached result if month hasn't changed
    if (monthKey === this._lastMonthKey && this._daysInMonth.length > 0) {
      return this._daysInMonth;
    }
    
    this._lastMonthKey = monthKey;
    this._daysInMonth = this.calculateDaysInMonth();
    return this._daysInMonth;
  }

  /**
   * Calculate days in current month with empty slots
   */
  private calculateDaysInMonth(): (moment.Moment | null)[] {
    const days: (moment.Moment | null)[] = [];
    const firstDay = this.currentMonth.clone().startOf('month');
    const lastDay = this.currentMonth.clone().endOf('month');
    const startingDayOfWeek = firstDay.day();

    // Add empty days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 0; i < lastDay.date(); i++) {
      days.push(firstDay.clone().add(i, 'days'));
    }

    return days;
  }

  /**
   * Update days when month changes
   */
  private updateDaysInMonth() {
    this._lastMonthKey = '';
    this.cdr.markForCheck();
  }

  /**
   * Navigate to previous/next month
   */
  changeMonth(direction: number) {
    this.currentMonth = this.currentMonth.clone().add(direction, 'month');
    this.selectedYear = this.currentMonth.year();
    this.updateDaysInMonth();
    this.changeMonthEvent.emit({
      year: this.currentMonth.year(),
      month: this.currentMonth.month() + 1
    });
  }

  /**
   * Toggle year picker popover
   */
  toggleYearPicker() {
    this.isYearPickerOpen = !this.isYearPickerOpen;
  }

  /**
   * Select a year from picker
   */
  selectYear(year: number) {
    this.selectedYear = year;
    this.currentMonth = this.currentMonth.clone().year(year);
    this.updateDaysInMonth();
    this.isYearPickerOpen = false;
  }

  /**
   * Get range of years for picker (100 years back)
   */
  private getYearRange(): number[] {
    const currentYear = moment().year();
    const years: number[] = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  }

  /**
   * Handle day click
   */
  onDayClick(day: moment.Moment | null) {
    if (!day || this.isDayDisabled(day)) {
      return;
    }
    
    const dateString = day.format('YYYY-MM-DD');
    this.selectedDate = dateString;
    this.dateSelected.emit(dateString);
  }

  /**
   * Check if day is disabled (future dates if maxDate is set)
   */
  isDayDisabled(day: moment.Moment | null): boolean {
    if (!day) return true;
    if (!this.maxDate) return false;
    
    const max = moment(this.maxDate);
    return day.isAfter(max, 'day');
  }

  /**
   * Get CSS classes for a day
   */
  getDayClass(day: moment.Moment | null): string {
    if (!day) return 'empty';
    
    const classes: string[] = [];
    const dayOfWeek = day.day();
    
    // Weekend vs weekday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      classes.push('weekend');
    } else {
      classes.push('weekday');
    }
    
    // Selected
    if (this.selectedDate && day.format('YYYY-MM-DD') === this.selectedDate) {
      classes.push('selected');
    }
    
    // Today
    if (day.isSame(moment(), 'day')) {
      classes.push('today');
    }
    
    // Completed
    if (this.completedDates.some(d => day.isSame(moment(d), 'day'))) {
      classes.push('completed');
    }
    
    // Disabled
    if (this.isDayDisabled(day)) {
      classes.push('disabled');
    }
    
    return classes.join(' ');
  }
}

