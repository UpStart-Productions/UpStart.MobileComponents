# Step Card Widget

A versatile, reusable Ionic card component for displaying steps, milestones, or any numbered sequential items. Features a color-coded circular badge, customizable action buttons, and optional approval indicators.

## Features

- ✨ **Numbered Badge**: Circular colored badge with step number
- 🎨 **Custom Colors**: Set custom badge colors or use defaults
- 🏆 **Approval Ribbon**: Optional gold ribbon icon for completed/approved steps
- 🎯 **Action Buttons**: Four customizable action buttons (readings, journal, inventory, practice)
- 💫 **Active State**: Highlight active steps with colored border
- 📱 **Responsive**: Works seamlessly on all screen sizes
- 🔧 **Highly Configurable**: Control visibility of descriptions, actions, and more

## Installation

1. Copy the component files to your project:
   - `step-card.component.ts`
   - `step-card.component.html`
   - `step-card.component.scss`

2. Import in your page/component:

```typescript
import { StepCardComponent, StepData } from './path/to/step-card.component';

@Component({
  // ...
  imports: [
    // ... other imports
    StepCardComponent
  ]
})
```

## Basic Usage

```html
<app-step-card
  [step]="myStep"
  (actionClicked)="handleAction($event)">
</app-step-card>
```

```typescript
export class MyComponent {
  myStep: StepData = {
    id: 1,
    stepNumber: 1,
    title: 'Getting Started',
    description: 'Learn the basics',
    isActive: true
  };

  handleAction(event: {stepNumber: number, action: string}) {
    console.log(`Action ${event.action} clicked on step ${event.stepNumber}`);
    // Handle the action (e.g., navigate to readings, open journal, etc.)
  }
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `step` | `StepData \| null` | `null` | The step data to display |
| `showActions` | `boolean` | `true` | Show/hide action buttons |
| `showDescription` | `boolean` | `true` | Show/hide description text |
| `isActive` | `boolean` | `false` | Mark step as active |
| `showActiveBorder` | `boolean` | `false` | Show blue border when active |
| `badgeColor` | `string` | `''` | Custom badge background color (hex, rgb, or CSS variable) |
| `hasSponsorApproval` | `boolean` | `false` | Show gold ribbon icon |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `actionClicked` | `{stepNumber: number, action: string}` | Emitted when an action button is clicked |

### StepData Interface

```typescript
interface StepData {
  id?: number;
  stepNumber: number;
  title: string;
  description?: string;
  isActive?: boolean;
}
```

## Examples

### Example 1: Basic Step with Actions

```html
<app-step-card
  [step]="{stepNumber: 1, title: 'First Step', description: 'Start here'}"
  (actionClicked)="handleAction($event)">
</app-step-card>
```

### Example 2: Custom Badge Color

```html
<app-step-card
  [step]="myStep"
  [badgeColor]="'#FF6B6B'">
</app-step-card>
```

### Example 3: Completed with Approval

```html
<app-step-card
  [step]="completedStep"
  [hasSponsorApproval]="true"
  [badgeColor]="'#4CAF50'">
</app-step-card>
```

### Example 4: Active Step with Border

```html
<app-step-card
  [step]="activeStep"
  [isActive]="true"
  [showActiveBorder]="true">
</app-step-card>
```

### Example 5: Display Only (No Actions)

```html
<app-step-card
  [step]="readOnlyStep"
  [showActions]="false">
</app-step-card>
```

### Example 6: Compact View (No Description)

```html
<app-step-card
  [step]="myStep"
  [showDescription]="false">
</app-step-card>
```

## Action Buttons

The widget includes four action buttons by default:

1. **Book Icon** (`readings`): For readings or educational content
2. **Journal Icon** (`journal`): For journaling or notes
3. **List Icon** (`inventory`): For checklists or inventories
4. **Body Icon** (`practice`): For practices or exercises

Handle these actions in your component:

```typescript
handleAction(event: {stepNumber: number, action: string}) {
  switch(event.action) {
    case 'readings':
      this.openReadings(event.stepNumber);
      break;
    case 'journal':
      this.openJournal(event.stepNumber);
      break;
    case 'inventory':
      this.openInventory(event.stepNumber);
      break;
    case 'practice':
      this.openPractice(event.stepNumber);
      break;
  }
}
```

## Styling Customization

The component uses Ionic CSS variables for easy theming:

```scss
// Override in your global styles
app-step-card {
  // Customize active border color
  .step-card.active {
    border-color: var(--ion-color-success);
  }
  
  // Customize action button colors
  .action-btn:hover {
    --background: var(--ion-color-secondary);
  }
}
```

## Use Cases

- **Educational Apps**: Course steps, lesson progression
- **Onboarding**: Multi-step user onboarding flows
- **Recovery Programs**: 12-step programs, milestone tracking
- **Project Management**: Task lists, project phases
- **Tutorials**: Step-by-step instructions
- **Checklists**: Sequential checklist items

## Dependencies

- `@angular/core`
- `@angular/common`
- `@ionic/angular`

## License

This component is part of the UpStart Mobile Components library.

## Credits

Extracted and refactored from the NephoPhone recovery app.


