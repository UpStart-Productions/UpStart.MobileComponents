# Date Scroller Widget

A smooth horizontal scrolling date picker that automatically centers on today's date. Perfect for exercise trackers, habit builders, calendar navigation, and any app that needs quick date selection across a time range.

## ✨ Features

- ✅ **Auto-scroll to Today** - Automatically centers on current date when loaded
- ✅ **Configurable Date Range** - Default: 2 months past → 1 week future
- ✅ **Visual State Indicators**
  - Today: Orange background
  - Selected: Blue background
  - Completed: Green border (for tracking activities)
- ✅ **Smooth Scrolling** - Native smooth scroll behavior
- ✅ **Event Emission** - Returns complete date object with formatted strings
- ✅ **Completion Tracking** - Pass array of completed dates for visual feedback
- ✅ **Responsive Design** - Fixed-width buttons with horizontal overflow
- ✅ **Right-to-Left Display** - Most recent dates appear first (configurable)

## 📦 Dependencies

```json
{
  "moment": "^2.30.1",
  "rxjs": "~7.8.0"
}
```

**Angular/Ionic:**
- `@angular/common` - CommonModule
- `@angular/core` - Component decorators, ViewChild, Input, Output, etc.

## 🚀 Installation

1. **Copy the component files** to your project:
   ```
   src/app/date-widgets/date-scroller/
   ├── date-scroller.component.ts
   ├── date-scroller.component.html
   └── date-scroller.component.scss
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install moment
   ```

3. **Import the component** in your page:
   ```typescript
   import { DateScrollerComponent } from './path/to/date-scroller.component';

   @Component({
     // ...
     imports: [DateScrollerComponent]
   })
   ```

## 💻 Usage

### Basic Usage

```html
<app-date-scroller
  (dateSelectedEvent)="handleDateSelect($event)">
</app-date-scroller>
```

```typescript
handleDateSelect(event: any) {
  console.log('Selected date:', event.date); // 'YYYY-MM-DD'
  console.log('Day name:', event.dayName);   // 'Mon', 'Tue', etc.
  console.log('Day number:', event.dayNumber); // '1', '2', etc.
  console.log('Is today?', event.isToday);   // boolean
}
```

### With Completion Tracking

Perfect for exercise apps, habit trackers, etc:

```html
<app-date-scroller
  [completedDates]="myCompletedDates"
  (dateSelectedEvent)="handleDateSelect($event)">
</app-date-scroller>
```

```typescript
export class MyComponent {
  myCompletedDates: string[] = [
    '2025-10-10',
    '2025-10-11',
    '2025-10-14'
  ];

  handleDateSelect(event: any) {
    // Handle date selection
  }
}
```

### Container Styling

For header placement (like in SuperSimpleWorkout):

```html
<ion-header class="ion-no-border">
  <ion-toolbar>
    <ion-title>My App</ion-title>
  </ion-toolbar>
  <div class="container-date-scroller">
    <app-date-scroller
      (dateSelectedEvent)="handleDateSelect($event)">
    </app-date-scroller>
  </div>
</ion-header>
```

```scss
.container-date-scroller {
  height: 10vh;
  padding-top: 18px;
  position: fixed;
  width: 100vw; 
  background-color: var(--ion-color-white);
  overflow-y: hidden;
  overflow-x: scroll;
}
```

## 🎨 Customization

### Component API

**Inputs:**
- `@Input() exercisesCompleted: string` - Status indicator ('all' or 'some')
- `@Input() completedDates: string[]` - Array of completed date strings ('YYYY-MM-DD')

**Outputs:**
- `@Output() dateSelectedEvent` - Emits when date is clicked

**Emitted Date Object:**
```typescript
{
  date: string;        // 'YYYY-MM-DD'
  dayName: string;     // 'Mon', 'Tue', etc.
  dayNumber: string;   // '1', '2', etc.
  month: string;       // 'October', 'November', etc.
  year: string;        // '2025'
  isToday: boolean;    // true if this is today's date
  isSelected: boolean; // true if this date is selected
}
```

### Modify Date Range

Edit the `calculateDateRange()` method in `date-scroller.component.ts`:

```typescript
calculateDateRange() {
  const dateEnd = moment().add(30, 'days');    // Change forward range
  const dateStart = moment().subtract(90, 'days'); // Change backward range
  
  // ... rest of method
}
```

### Customize Colors

Override CSS variables in your component's SCSS:

```scss
app-date-scroller {
  .date-scroller .date.today {
    background-color: #ff6b6b; // Custom today color
    border: 1px solid #ff6b6b;
  }

  .date-scroller .date.selected {
    background-color: #4ecdc4; // Custom selected color
    border: 1px solid #4ecdc4;
  }

  .date-scroller .date.completed {
    border: 2px solid #95e1d3; // Custom completed color
  }
}
```

### Customize Button Size

```scss
app-date-scroller {
  .date-scroller .date {
    width: 3rem;   // Larger buttons
    height: 3rem;
    font-size: 0.85rem;
  }
}
```

## 🎯 Use Cases

1. **Exercise Tracking Apps** - Select workout dates and see completion history
2. **Habit Builders** - Track daily habits with visual completion indicators
3. **Task Managers** - Quick date navigation for todo items
4. **Calendar Apps** - Alternative to traditional calendar picker
5. **Timeline Navigation** - Browse events across dates
6. **Sobriety Trackers** - Track clean days with completion markers
7. **Medication Reminders** - Mark medication taken on specific dates

## 🔧 Best Practices

1. **Container Height**: Give parent container a fixed height for consistent layout
2. **Completion Updates**: Update `completedDates` array to trigger visual changes
3. **Performance**: Component auto-destroys subscriptions on destroy
4. **Accessibility**: Use semantic HTML and ARIA labels for screen readers
5. **Testing**: Test on actual device for smooth scroll behavior

## 🐛 Troubleshooting

### Dates not centering on today
- Ensure the component has `ngAfterViewInit` lifecycle access
- Check that parent container has defined width
- Verify `scrollToCurrentDate()` fires after DOM render

### Scrollbar visible
- Parent container should have `overflow-y: hidden`
- Component handles horizontal overflow internally

### Completed dates not showing
- Ensure dates are in `'YYYY-MM-DD'` format
- Verify `completedDates` input is bound correctly
- Check that dates fall within the calculated range

### Auto-scroll not working
- Component uses `setTimeout(50ms)` delay for DOM readiness
- Increase delay if needed: `setTimeout(() => { this.scrollToCurrentDate(); }, 100);`

## 📝 Source

Extracted from **SuperSimpleWorkout** app by Jeff Denton.

**Original Use Case**: Exercise tracking with daily completion indicators. Users scroll through dates to view and mark exercises for specific days.

## 🔗 Related Components

- **Calendar Widget** - Full month/year calendar with date selection
- **Date Picker** (future) - Traditional dropdown date picker
- **Timeline Widget** (future) - Vertical scrolling timeline

---

**Version**: 1.0.0  
**Last Updated**: October 16, 2025  
**License**: MIT

