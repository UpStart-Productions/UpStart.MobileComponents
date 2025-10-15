# Avatar Picker Widget

A beautiful, scrollable avatar selector with 30 unique avatar images. Features smooth animations, selected state highlighting, and responsive design. Perfect for profile setup, settings, or any user customization interface.

## Features

- 👤 **30 Unique Avatars**: Diverse collection of avatar images
- 📱 **Horizontal Scrolling**: Smooth touch scrolling with hidden scrollbar
- ✨ **Selected State**: Highlighted border with scale animation
- 🎨 **Hover Effects**: Subtle scale on hover (desktop)
- 📐 **Responsive**: Adapts size for mobile screens (100px → 80px)
- 🎯 **Simple API**: Just two properties (input + output)
- 💫 **Smooth Animations**: CSS transitions for professional feel

## Installation

1. Copy the component files to your project:
   - `avatar-picker.component.ts`
   - `avatar-picker.component.html`
   - `avatar-picker.component.scss`

2. Copy the avatar images:
   - Copy `assets/images/avatars/*.png` (30 avatar images)

3. Import in your page/component:

```typescript
import { AvatarPickerComponent } from './path/to/avatar-picker.component';

@Component({
  // ...
  imports: [
    // ... other imports
    AvatarPickerComponent
  ]
})
```

## Basic Usage

```html
<app-avatar-picker
  [selectedAvatar]="userAvatar"
  (avatarSelected)="onAvatarSelected($event)">
</app-avatar-picker>
```

```typescript
export class ProfilePage {
  userAvatar: string = 'assets/images/avatars/avatar-1.png';

  onAvatarSelected(avatarPath: string) {
    console.log('Avatar selected:', avatarPath);
    this.userAvatar = avatarPath;
    // Save to database, localStorage, etc.
  }
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedAvatar` | `string` | `''` | Currently selected avatar path |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `avatarSelected` | `string` | Emitted when an avatar is selected (returns avatar path) |

## Examples

### Example 1: Profile Setup

```html
<h2>Choose Your Avatar</h2>
<app-avatar-picker
  [selectedAvatar]="profileData.avatar"
  (avatarSelected)="onAvatarSelected($event)">
</app-avatar-picker>
```

```typescript
export class ProfileSetupPage {
  profileData = {
    name: '',
    avatar: 'assets/images/avatars/avatar-1.png'
  };

  onAvatarSelected(avatar: string) {
    this.profileData.avatar = avatar;
  }
}
```

### Example 2: Settings Page

```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Change Avatar</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <div class="current-avatar">
      <ion-avatar>
        <img [src]="currentAvatar" alt="Current avatar">
      </ion-avatar>
    </div>
    
    <app-avatar-picker
      [selectedAvatar]="currentAvatar"
      (avatarSelected)="updateAvatar($event)">
    </app-avatar-picker>
  </ion-card-content>
</ion-card>
```

```typescript
export class SettingsPage {
  currentAvatar: string = '';

  async updateAvatar(newAvatar: string) {
    this.currentAvatar = newAvatar;
    await this.saveToDatabase();
  }
}
```

### Example 3: Team Member Selection

```html
<app-avatar-picker
  [selectedAvatar]="selectedMember"
  (avatarSelected)="assignMember($event)">
</app-avatar-picker>
```

```typescript
export class TeamPage {
  selectedMember: string = '';
  
  assignMember(avatar: string) {
    const memberIndex = this.extractAvatarNumber(avatar);
    console.log('Team member', memberIndex, 'assigned');
  }
  
  extractAvatarNumber(path: string): number {
    const match = path.match(/avatar-(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}
```

### Example 4: With Custom Avatars

You can extend the component to use custom avatar paths:

```typescript
// In your extended component
avatarOptions: string[] = [
  'assets/custom/avatar-a.png',
  'assets/custom/avatar-b.png',
  'assets/custom/avatar-c.png'
];
```

## Styling Customization

### Avatar Size

```scss
app-avatar-picker {
  ::ng-deep .avatar-option {
    width: 120px;
    height: 120px;
  }
}
```

### Selected Border Color

```scss
app-avatar-picker {
  ::ng-deep .avatar-option.selected {
    border-color: var(--ion-color-success);
    box-shadow: 0 4px 8px rgba(var(--ion-color-success-rgb), 0.4);
  }
}
```

### Scroll Container

```scss
app-avatar-picker {
  ::ng-deep .avatar-scroll-container {
    gap: 1.5rem;  // Increase spacing
    padding: 1rem 0;  // Add vertical padding
  }
}
```

### Background

```scss
app-avatar-picker {
  ::ng-deep .avatar-option {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
```

## Avatar Images

The component expects 30 avatar images:
- `assets/images/avatars/avatar-1.png` through `avatar-30.png`
- Recommended size: 200x200px or higher
- Format: PNG with transparency preferred
- Optimized for web delivery

## Use Cases

- **Profile Setup**: Let users choose their profile picture
- **Settings**: Change avatar in account settings
- **Team Management**: Assign avatars to team members
- **Gaming**: Character selection, player icons
- **Chat Apps**: User avatars in messaging
- **Forums**: User profile pictures
- **Recovery Apps**: Anonymous profile representation (NephoPhone!)
- **Education**: Student/teacher avatars

## Accessibility

Add ARIA labels for better accessibility:

```html
<div 
  role="radio"
  [attr.aria-checked]="isSelected(avatar)"
  [attr.aria-label]="'Avatar option ' + i">
  <app-avatar-picker></app-avatar-picker>
</div>
```

## Performance

- **Lazy Loading**: Consider lazy loading images with `loading="lazy"`
- **Image Optimization**: Compress PNGs for faster load
- **Virtual Scrolling**: For 100+ avatars, consider virtual scrolling
- **Caching**: Images are cached by browser automatically

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ iOS Safari (all versions)
- ✅ Android Chrome (all versions)

## Advanced Usage

### Pre-select Random Avatar

```typescript
export class RandomAvatarPage implements OnInit {
  selectedAvatar: string = '';

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * 30) + 1;
    this.selectedAvatar = `assets/images/avatars/avatar-${randomIndex}.png`;
  }
}
```

### Avatar Categories

```typescript
// Extend component for categorized avatars
export class CategorizedAvatarPicker extends AvatarPickerComponent {
  maleAvatars = this.avatarOptions.slice(0, 15);
  femaleAvatars = this.avatarOptions.slice(15, 30);
}
```

### Validation

```typescript
onAvatarSelected(avatar: string) {
  if (!this.isValidAvatar(avatar)) {
    console.error('Invalid avatar selected');
    return;
  }
  this.currentAvatar = avatar;
}

isValidAvatar(path: string): boolean {
  return path.includes('assets/images/avatars/avatar-');
}
```

## Dependencies

- `@angular/core`
- `@angular/common`

**Note:** This is a pure Angular component with no external dependencies!

## License

This component is part of the UpStart Mobile Components library.

## Credits

Extracted from the NephoPhone recovery app's profile setup system.


