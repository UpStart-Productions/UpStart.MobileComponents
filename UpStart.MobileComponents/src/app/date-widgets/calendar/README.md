# Calendar Widget

A beautiful, fully-featured calendar component with month/year navigation, date selection, and customizable styling. Features a popover year picker and support for disabled dates, completed dates, and selected dates.

## Features

- 📅 **Month/Year Navigation**: Prev/next arrows and elegant popover year picker
- 🎨 **Visual States**: Selected, today, completed, disabled, weekend/weekday
- 🔒 **Max Date Support**: Disable future dates or set custom limits
- ✅ **Completed Dates**: Visual indicators for completed activities
- 📱 **Responsive Design**: Beautiful on all screen sizes
- 🎯 **Click Handling**: Smooth touch interactions with proper event handling
- 💫 **Performance Optimized**: Cached day calculations for smooth rendering

## Installation

1. Copy the component files to your project:
   - `calendar.component.ts`
   - `calendar.component.html`
   - `calendar.component.scss`

2. Install moment.js (required dependency):
```bash
npm install moment
```

3. Import in your page/component:

```typescript
import { CalendarComponent } from './path/to/calendar.component';

@Component({
  // ...
  imports: [
    // ... other imports
    CalendarComponent
  ]
})
```

## Basic Usage

```html
<app-calendar
  [selectedDate]="myDate"
  (dateSelected)="onDateSelected($event)">
</app-calendar>
```

```typescript
export class MyComponent {
  myDate: string = moment().format('YYYY-MM-DD');

  onDateSelected(date: string) {
    console.log('Selected date:', date);
    this.myDate = date;
  }
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `completedDates` | `string[]` | `[]` | Array of dates marked as completed (ISO format) |
| `selectedDate` | `string \| null` | `null` | Currently selected date (ISO format) |
| `maxDate` | `string \| null` | `null` | Maximum selectable date - disables future dates |
| `selectedAttributes` | `any` | - | Additional custom attributes |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `dateSelected` | `string` | Emitted when a date is selected (ISO format: YYYY-MM-DD) |
| `changeMonthEvent` | `{year: number, month: number}` | Emitted when month changes |

## Examples

### Example 1: Basic Date Selection

```html
<app-calendar
  [selectedDate]="selectedDate"
  (dateSelected)="onDateSelected($event)">
</app-calendar>
```

### Example 2: Sobriety Date (NephoPhone Style)

```html
<app-calendar
  [selectedDate]="sobrietyDate"
  [maxDate]="today"
  (dateSelected)="onSobrietyDateChanged($event)">
</app-calendar>
```

```typescript
export class ProfileSetupPage {
  sobrietyDate: string = moment().subtract(90, 'days').format('YYYY-MM-DD');
  today: string = moment().format('YYYY-MM-DD');

  onSobrietyDateChanged(date: string) {
    this.sobrietyDate = date;
    const daysSober = moment().diff(moment(date), 'days');
    console.log(`Sobriety date set: ${daysSober} days sober`);
  }
}
```

### Example 3: Activity Tracker with Completed Dates

```html
<app-calendar
  [selectedDate]="selectedDate"
  [completedDates]="completedDates"
  (dateSelected)="onActivityDateSelected($event)">
</app-calendar>
```

```typescript
export class ActivityTrackerPage {
  selectedDate: string | null = null;
  completedDates: string[] = [
    '2025-10-01',
    '2025-10-03',
    '2025-10-05',
    '2025-10-08',
    '2025-10-12'
  ];

  onActivityDateSelected(date: string) {
    const isCompleted = this.completedDates.includes(date);
    console.log(`Selected ${date}: ${isCompleted ? 'Completed' : 'Not completed'}`);
  }
}
```

### Example 4: Date Range Selector

```html
<!-- Start Date -->
<app-calendar
  [selectedDate]="startDate"
  [maxDate]="endDate || today"
  (dateSelected)="onStartDateSelected($event)">
</app-calendar>

<!-- End Date -->
<app-calendar
  [selectedDate]="endDate"
  [maxDate]="today"
  (dateSelected)="onEndDateSelected($event)">
</app-calendar>
```

## Styling Customization

The calendar uses a gradient background by default. Wrap it in a container with your preferred styling:

```html
<div class="my-calendar-wrapper">
  <app-calendar></app-calendar>
</div>
```

```scss
.my-calendar-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Customizing Calendar Styles

You can override the default styles:

```scss
app-calendar {
  // Calendar container
  ::ng-deep .calendar-container {
    padding: 2rem;
  }

  // Navigation buttons
  ::ng-deep .nav-button {
    background: rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  // Selected date
  ::ng-deep .selected {
    border-color: var(--ion-color-success);
  }

  // Today indicator
  ::ng-deep .today {
    color: var(--ion-color-primary);
    border-color: var(--ion-color-primary);
  }
}
```

## Date States

The calendar supports multiple visual states for dates:

- **Selected**: Bordered date with background highlight
- **Today**: Special color indicator (warning color by default)
- **Completed**: Border indicator for completed activities
- **Disabled**: Greyed out and non-clickable (future dates when maxDate is set)
- **Weekend**: Subtle background differentiation
- **Weekday**: Default appearance

## Use Cases

- **Profile Setup**: Sobriety date, birthdate, milestone dates
- **Activity Tracking**: Mark completed days for habits, exercises, tasks
- **Event Planning**: Select event dates, availability
- **Date Range Selection**: Start/end date pickers for reports
- **Booking Systems**: Hotel check-in/out, appointment scheduling
- **Content Management**: Publish dates, schedule posts
- **Analytics**: Date range filters for reports

## Dependencies

- `@angular/core`
- `@angular/common`
- `@ionic/angular/standalone`
- `moment` - Date manipulation library

## Performance Notes

- Days are cached to avoid recalculation on every change detection
- Uses `OnPush` change detection strategy compatible
- Efficient month/year transitions
- Minimal DOM updates

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ iOS Safari (all versions)
- ✅ Android WebView (all versions)

## License

This component is part of the UpStart Mobile Components library.

## Credits

Extracted and refactored from the NephoPhone recovery app.

