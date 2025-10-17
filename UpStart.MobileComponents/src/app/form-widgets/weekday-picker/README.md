# Weekday Picker Widget

A clean, intuitive day-of-week selector with individual day toggles and a convenient "Every day" quick-select button. Perfect for scheduling recurring events, habit tracking, workout plans, and any feature requiring weekly patterns.

## ✨ Features

- ✅ **Individual Day Toggles** - Click any day to select/deselect
- ✅ **"Every Day" Shortcut** - One-click to select all 7 days
- ✅ **Visual Feedback** - Selected days highlighted in secondary color
- ✅ **Default All Selected** - Starts with all days enabled
- ✅ **Configurable Labels** - Customize day abbreviations if needed
- ✅ **Event Emission** - Emits selection array and dirty state
- ✅ **Touch-friendly** - 26px circular buttons with proper spacing
- ✅ **Form Integration** - Built for reactive forms with dirty tracking

## 📦 Dependencies

No external dependencies! Uses only:
- `@angular/common` - CommonModule (for KeyValue pipe)
- `@angular/core` - Component decorators
- **CSS Variables** - Uses `--ion-color-secondary`

## 🚀 Installation

### 1. Copy Component Files

```
src/app/form-widgets/weekday-picker/
├── weekday-picker.component.ts
├── weekday-picker.component.html
└── weekday-picker.component.scss
```

### 2. Import Component

```typescript
import { WeekdayPickerComponent } from './path/to/weekday-picker.component';

@Component({
  // ...
  imports: [WeekdayPickerComponent]
})
```

## 💻 Usage

### Basic Usage (All Days Selected)

```html
<app-weekday-picker
  label="Select days"
  (weekdaysSelectedEvent)="handleWeekdaySelection($event)">
</app-weekday-picker>
```

```typescript
export class MyComponent {
  handleWeekdaySelection(weekdays: any) {
    console.log('Selected weekdays:', weekdays);
    // [
    //   { day: 'Sunday', selected: true },
    //   { day: 'Monday', selected: true },
    //   ...
    // ]
  }
}
```

### Pre-select Specific Days

```html
<app-weekday-picker
  label="Workout schedule"
  [selectedWeekdays]="mySchedule"
  (weekdaysSelectedEvent)="handleWeekdaySelection($event)">
</app-weekday-picker>
```

```typescript
export class MyComponent {
  // Weekdays only (M-F)
  mySchedule = [
    { 'day': 'Sunday', 'selected': false },
    { 'day': 'Monday', 'selected': true },
    { 'day': 'Tuesday', 'selected': true },
    { 'day': 'Wednesday', 'selected': true },
    { 'day': 'Thursday', 'selected': true },
    { 'day': 'Friday', 'selected': true },
    { 'day': 'Saturday', 'selected': false }
  ];

  handleWeekdaySelection(weekdays: any) {
    this.mySchedule = weekdays;
  }
}
```

### With Form Dirty State

```html
<app-weekday-picker
  label="Select training days"
  [selectedWeekdays]="trainingDays"
  (weekdaysSelectedEvent)="onDaysChange($event)"
  (dirtyControlEvent)="onFormDirty($event)">
</app-weekday-picker>
```

```typescript
onDaysChange(weekdays: any) {
  this.trainingDays = weekdays;
}

onFormDirty(isDirty: boolean) {
  this.formDirty = isDirty;
  // Enable save button, etc.
}
```

## 🎨 Common Patterns

### Weekdays Only (M-F)

```typescript
weekdaysOnly = [
  { 'day': 'Sunday', 'selected': false },
  { 'day': 'Monday', 'selected': true },
  { 'day': 'Tuesday', 'selected': true },
  { 'day': 'Wednesday', 'selected': true },
  { 'day': 'Thursday', 'selected': true },
  { 'day': 'Friday', 'selected': true },
  { 'day': 'Saturday', 'selected': false }
];
```

### Weekends Only

```typescript
weekendsOnly = [
  { 'day': 'Sunday', 'selected': true },
  { 'day': 'Monday', 'selected': false },
  { 'day': 'Tuesday', 'selected': false },
  { 'day': 'Wednesday', 'selected': false },
  { 'day': 'Thursday', 'selected': false },
  { 'day': 'Friday', 'selected': false },
  { 'day': 'Saturday', 'selected': true }
];
```

### MWF Pattern (Common Workout Schedule)

```typescript
mwfPattern = [
  { 'day': 'Sunday', 'selected': false },
  { 'day': 'Monday', 'selected': true },
  { 'day': 'Tuesday', 'selected': false },
  { 'day': 'Wednesday', 'selected': true },
  { 'day': 'Thursday', 'selected': false },
  { 'day': 'Friday', 'selected': true },
  { 'day': 'Saturday', 'selected': false }
];
```

## 🎨 Customization

### Component API

**Inputs:**
- `@Input() label: string` - Label text (default: 'Pick some weekdays')
- `@Input() weekdayOptions: any` - Day abbreviations object (default: S M T W T F S)
- `@Input() selectedWeekdays: any[]` - Array of day objects with `selected` flags

**Outputs:**
- `@Output() weekdaysSelectedEvent` - Emits weekdays array on any change
- `@Output() dirtyControlEvent` - Emits `true` when user interacts

### Data Structure

```typescript
// Each weekday is an object
{
  day: 'Monday',      // Full day name
  selected: true      // Boolean flag
}
```

### Custom Day Abbreviations

```typescript
// Change default S M T W T F S labels
customWeekdayOptions = {
  'Sunday': 'Su',
  'Monday': 'Mo',
  'Tuesday': 'Tu',
  'Wednesday': 'We',
  'Thursday': 'Th',
  'Friday': 'Fr',
  'Saturday': 'Sa'
};
```

```html
<app-weekday-picker
  [weekdayOptions]="customWeekdayOptions"
  ...>
</app-weekday-picker>
```

### Container Styling

```scss
app-weekday-picker {
  .control-container {
    background-color: #f5f5f5;  // Custom background
    border: 2px solid #333;     // Thicker border
    border-radius: 15px;        // More rounded
  }
}
```

### Button Colors

```scss
app-weekday-picker {
  .btn-weekday-picker {
    border-color: #4f2cc2;  // Custom border color
    color: #4f2cc2;
    
    &.selected {
      background-color: #4f2cc2;
      color: white;
    }
  }
}
```

### Button Size

```scss
app-weekday-picker {
  .btn-weekday-picker {
    width: 32px;   // Larger buttons
    height: 32px;
    font-size: 0.85rem;
  }
  
  .btn-every-day {
    width: 110px;  // Wider button
    height: 34px;
  }
}
```

## 🎯 Use Cases

1. **Exercise Apps** - Schedule workout days
2. **Habit Trackers** - Set recurring daily habits
3. **Task Managers** - Recurring task schedules
4. **Calendar Apps** - Repeat event patterns
5. **Reminder Apps** - Weekly notification schedules
6. **Education Apps** - Class schedules
7. **Meal Planning** - Weekly meal prep days
8. **Medication Reminders** - Daily dosing schedules

## 🔧 Best Practices

1. **Pre-select Defaults**: Set sensible defaults based on use case
   - Exercise: Weekdays (M-F)
   - Work tasks: Weekdays
   - Personal habits: Every day
   
2. **Clear Labels**: Use descriptive labels like "Training days" not just "Days"

3. **Visual Feedback**: Component handles this - selected days are clearly highlighted

4. **Save State**: Persist user's selection to local storage or database

5. **Form Integration**: Use `dirtyControlEvent` to track form changes

6. **Validation**: Check that at least one day is selected before saving

## 📝 Helper Functions

### Get Selected Day Names

```typescript
getSelectedDays(weekdays: any[]): string[] {
  return weekdays
    .filter(d => d.selected)
    .map(d => d.day);
}
```

### Get Selected Count

```typescript
getSelectedCount(weekdays: any[]): number {
  return weekdays.filter(d => d.selected).length;
}
```

### Check If All Selected

```typescript
isEveryDaySelected(weekdays: any[]): boolean {
  return weekdays.every(d => d.selected);
}
```

### Format for Display

```typescript
formatWeekdays(weekdays: any[]): string {
  const selected = weekdays.filter(d => d.selected);
  if (selected.length === 7) return 'Every day';
  if (selected.length === 0) return 'None';
  return selected.map(d => d.day.substring(0, 3)).join(', ');
}
```

## 🐛 Troubleshooting

### Days not toggling
- Verify `selectedWeekdays` is properly bound with `[selectedWeekdays]`
- Check that array has correct structure: `[{ day: 'Monday', selected: true }]`
- Ensure you're updating the reference: `this.weekdays = [...updatedArray]`

### "Every day" button not working
- Component handles this automatically
- Verify `isEveryDaySelected()` method is present in component
- Check CSS class `.selected` is being applied

### Visual feedback not showing
- Verify `--ion-color-secondary` is defined in your theme
- Check that `.btn-weekday-picker.selected` styles are loading
- Ensure CSS is not being overridden

### Event not firing
- Verify event binding: `(weekdaysSelectedEvent)="myMethod($event)"`
- Check browser console for errors
- Ensure method exists in parent component

### Order getting scrambled
- Component uses `keyvalue:returnZero` to prevent alpha-sorting
- Verify `returnZero()` method exists in component
- Days should always appear in Sunday→Saturday order

## 📝 Technical Notes

### KeyValue Pipe Prevention

The component uses `returnZero()` to prevent Angular's KeyValue pipe from alpha-sorting the days:

```typescript
returnZero() {
  return 0;  // Prevents sorting
}
```

```html
*ngFor="let day of weekdayOptions | keyvalue:returnZero"
```

### Event Flow

1. User clicks day button → `toggleSelectedDay(day)`
2. Finds matching day in array, toggles `selected` flag
3. Emits `weekdaysSelectedEvent` with updated array
4. Emits `dirtyControlEvent` with `true`
5. Parent component receives events

### Auto-initialization

If `selectedWeekdays` is `null` or empty on init:
- Component creates default array with all days selected
- Emits initial state via `weekdaysSelectedEvent`

## 📝 Source

Extracted from **SuperSimpleWorkout** app by Jeff Denton.

**Original Use Case**: Exercise scheduling - users select which days of the week to perform each exercise.

## 🔗 Related Components

- **Color Picker** - Animated color selection widget
- **Time Picker** (future) - Time selection for schedules
- **Date Picker** (future) - Date selection widget

---

**Version**: 1.0.0  
**Last Updated**: October 17, 2025  
**License**: MIT

