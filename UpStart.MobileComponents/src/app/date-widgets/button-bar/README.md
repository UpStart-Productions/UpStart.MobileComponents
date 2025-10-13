# Button Bar (Segmented Control) Widget

A beautiful animated segmented control with a smooth sliding highlight indicator. Perfect for tab bars, filters, date ranges, or any multi-option selection. Features smooth animations and fully customizable colors.

## Features

- ✨ **Smooth Animation**: Sliding highlight transitions smoothly between options
- 🎨 **Custom Colors**: Fully customizable background, highlight, and label colors
- 🔢 **Flexible Options**: Support for 2-6+ buttons with automatic width calculation
- 📱 **Responsive**: Adapts to container width automatically
- 🎯 **Easy Integration**: Simple configuration object and event emission
- 💜 **Purple Theme Default**: Beautiful purple theme from NephoPhone

## Installation

1. Copy the component file to your project:
   - `button-bar.component.ts` (all-in-one component with template and styles)

2. Import in your page/component:

```typescript
import { ButtonBarComponent, ButtonBarConfig } from './path/to/button-bar.component';

@Component({
  // ...
  imports: [
    // ... other imports
    ButtonBarComponent
  ]
})
```

## Basic Usage

```html
<app-button-bar
  [config]="myConfig"
  (buttonSelectedEvent)="onSelection($event)">
</app-button-bar>
```

```typescript
export class MyComponent {
  myConfig: ButtonBarConfig = {
    buttons: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' }
    ]
  };

  onSelection(value: string) {
    console.log('Selected:', value);
  }
}
```

## API Reference

### Configuration Interface

```typescript
interface ButtonBarConfig {
  buttons: { label: string, value: any }[];
  colors?: ButtonBarColors;
}

interface ButtonBarColors {
  buttonBarColor?: string;
  labelColor?: string;
  highlighterColor?: string;
  highlighterLabelColor?: string;
}
```

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `ButtonBarConfig` | `{ buttons: [] }` | Button bar configuration |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `buttonSelectedEvent` | `any` | Emitted when a button is selected (returns button value) |

### Default Colors

```typescript
{
  buttonBarColor: '#5433c6',        // Purple background
  labelColor: 'white',              // White unselected labels
  highlighterColor: 'white',        // White highlight
  highlighterLabelColor: 'black'    // Black selected label
}
```

## Examples

### Example 1: Date Range Selector (NephoPhone Style)

```html
<app-button-bar
  [config]="dateRangeConfig"
  (buttonSelectedEvent)="onDateRangeSelected($event)">
</app-button-bar>
```

```typescript
export class ExportDataPage {
  dateRangeConfig: ButtonBarConfig = {
    buttons: [
      { label: '1W', value: '1week' },
      { label: '1M', value: '1month' },
      { label: '3M', value: '3months' },
      { label: '6M', value: '6months' },
      { label: '1Y', value: '1year' },
      { label: 'All', value: 'all' }
    ]
    // Uses default purple theme
  };

  onDateRangeSelected(value: string) {
    console.log('Date range:', value);
    this.loadDataForRange(value);
  }
}
```

### Example 2: Tab Bar with Custom Colors

```html
<app-button-bar
  [config]="tabConfig"
  (buttonSelectedEvent)="onTabChange($event)">
</app-button-bar>
```

```typescript
export class DashboardPage {
  tabConfig: ButtonBarConfig = {
    buttons: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' }
    ],
    colors: {
      buttonBarColor: '#2196F3',           // Blue background
      highlighterColor: 'white',            // White highlight
      labelColor: 'white',                  // White labels
      highlighterLabelColor: '#2196F3'      // Blue selected label
    }
  };

  onTabChange(period: string) {
    this.currentPeriod = period;
    this.refreshData();
  }
}
```

### Example 3: Filter Options

```html
<app-button-bar
  [config]="filterConfig"
  (buttonSelectedEvent)="onFilterChange($event)">
</app-button-bar>
```

```typescript
export class TaskListPage {
  filterConfig: ButtonBarConfig = {
    buttons: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' }
    ],
    colors: {
      buttonBarColor: '#4CAF50',
      highlighterColor: '#FFEB3B',
      labelColor: 'white',
      highlighterLabelColor: '#2E7D32'
    }
  };

  onFilterChange(filter: string) {
    this.currentFilter = filter;
    this.filterTasks();
  }
}
```

### Example 4: Numeric Values

```html
<app-button-bar
  [config]="itemsPerPageConfig"
  (buttonSelectedEvent)="onItemsPerPageChange($event)">
</app-button-bar>
```

```typescript
export class DataTablePage {
  itemsPerPageConfig: ButtonBarConfig = {
    buttons: [
      { label: '10', value: 10 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ]
  };

  onItemsPerPageChange(count: number) {
    this.itemsPerPage = count;
    this.refreshTable();
  }
}
```

### Example 5: Custom Brand Colors

```html
<app-button-bar
  [config]="customConfig"
  (buttonSelectedEvent)="onSelection($event)">
</app-button-bar>
```

```typescript
export class MyComponent {
  customConfig: ButtonBarConfig = {
    buttons: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ],
    colors: {
      buttonBarColor: '#FF6B6B',    // Red coral
      highlighterColor: '#FFF',      // White
      labelColor: '#FFF',            // White
      highlighterLabelColor: '#FF6B6B'  // Red coral
    }
  };
}
```

## Styling Tips

### Container Sizing

The button bar is responsive and fills its container:

```html
<div class="button-bar-container">
  <app-button-bar [config]="config"></app-button-bar>
</div>
```

```scss
.button-bar-container {
  padding: 8px;
  background: var(--ion-color-light);
  border-radius: 8px;
}
```

### Button Count Recommendations

- **2-3 buttons**: Best for binary/ternary choices
- **4-6 buttons**: Good for multiple options (like date ranges)
- **7+ buttons**: Consider a dropdown instead for better UX

## Color Scheme Examples

### Purple (Default - NephoPhone)
```typescript
colors: {
  buttonBarColor: '#5433c6',
  labelColor: 'white',
  highlighterColor: 'white',
  highlighterLabelColor: 'black'
}
```

### Blue Professional
```typescript
colors: {
  buttonBarColor: '#2196F3',
  labelColor: 'white',
  highlighterColor: 'white',
  highlighterLabelColor: '#2196F3'
}
```

### Green Success
```typescript
colors: {
  buttonBarColor: '#4CAF50',
  labelColor: 'white',
  highlighterColor: '#FFEB3B',
  highlighterLabelColor: '#2E7D32'
}
```

### Red Accent
```typescript
colors: {
  buttonBarColor: '#FF6B6B',
  labelColor: 'white',
  highlighterColor: 'white',
  highlighterLabelColor: '#FF6B6B'
}
```

### Dark Mode
```typescript
colors: {
  buttonBarColor: '#1E1E1E',
  labelColor: '#CCCCCC',
  highlighterColor: '#3A3A3A',
  highlighterLabelColor: 'white'
}
```

## Use Cases

- **Date Range Selection**: Week, month, year, all-time filters
- **View Switching**: Day/week/month views in calendars
- **Data Filtering**: All/active/completed status filters
- **Settings**: On/off toggles, preference selection
- **Pagination**: Items per page selection
- **Chart Types**: Line/bar/pie chart selection
- **Time Periods**: Morning/afternoon/evening/night
- **Difficulty Levels**: Easy/medium/hard

## Animation Details

The highlight smoothly slides using CSS transitions:
- **Transition Duration**: 0.2s
- **Easing Function**: ease-in-out
- **Property**: left position
- **Calculation**: Automatic based on button count

## Dependencies

- `@angular/core`
- `@angular/common`

Note: This is a standalone component with no external dependencies. No Ionic packages required!

## Performance

- Lightweight: All-in-one component (~150 lines total)
- No external libraries
- CSS-based animations (GPU accelerated)
- Minimal DOM updates
- Compatible with OnPush change detection

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ iOS Safari (all versions)
- ✅ Android WebView (all versions)

## License

This component is part of the UpStart Mobile Components library.

## Credits

Extracted from the NephoPhone recovery app's Export Data page.

