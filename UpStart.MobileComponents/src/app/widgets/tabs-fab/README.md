# Tab Bar + FAB Widget

A beautiful bottom tab navigation with a centered floating action button (FAB) for quick actions. This pattern is commonly used in mobile apps to provide easy access to primary actions while maintaining clear navigation.

## Features

- ✅ **4-Tab Navigation** - Home, Profile, Explore, Settings (customizable)
- ✅ **Centered FAB** - Floating action button perfectly centered above tab bar
- ✅ **Icon Switching** - Outline icons for inactive tabs, solid for active
- ✅ **Quick Actions Menu** - Action sheet with customizable options
- ✅ **iOS Safe Area** - Handles home indicator on modern iPhones
- ✅ **Smooth Animations** - Icon transitions and tab selection
- ✅ **Responsive Design** - Works on all screen sizes

## Usage

### Basic Implementation

```typescript
// tabs-fab-demo.page.ts
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {
  selectedTab: string = 'home';

  constructor(private actionSheetController: ActionSheetController) {}

  async openQuickActions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quick Actions',
      buttons: [
        {
          text: 'Create Note',
          icon: 'journal-outline',
          handler: () => {
            // Handle action
          }
        },
        {
          text: 'Add Task',
          icon: 'checkmark-circle-outline',
          handler: () => {
            // Handle action
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
```

### HTML Template

```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home">
      <ion-icon name="home-outline" class="outline-icon"></ion-icon>
      <ion-icon name="home" class="solid-icon"></ion-icon>
      <ion-label>Home</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="profile">
      <ion-icon name="person-outline" class="outline-icon"></ion-icon>
      <ion-icon name="person" class="solid-icon"></ion-icon>
      <ion-label>Profile</ion-label>
    </ion-tab-button>

    <!-- Hidden spacer for FAB -->
    <ion-tab-button class="fab-spacer" disabled="true" style="visibility: hidden;">
    </ion-tab-button>

    <ion-tab-button tab="explore">
      <ion-icon name="grid-outline" class="outline-icon"></ion-icon>
      <ion-icon name="grid" class="solid-icon"></ion-icon>
      <ion-label>Explore</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="settings">
      <ion-icon name="settings-outline" class="outline-icon"></ion-icon>
      <ion-icon name="settings" class="solid-icon"></ion-icon>
      <ion-label>Settings</ion-label>
    </ion-tab-button>
  </ion-tab-bar>

  <!-- Centered FAB -->
  <ion-fab class="fab-center">
    <ion-fab-button (click)="openQuickActions()">
      <ion-icon name="add-outline" style="color: white;"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</ion-tabs>
```

### SCSS Styling

```scss
/* Floating Action Button positioning */
ion-fab.fab-center {
  position: fixed !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  bottom: 50px !important;
  z-index: 1000 !important;
}

/* iOS specific adjustments */
.ios ion-fab.fab-center {
  bottom: 60px !important;
}

/* FAB button styling */
ion-fab-button {
  --size: 56px;
  --color: white;
  --background: var(--ion-color-primary);
  --box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 
                0px 6px 10px 0px rgba(0, 0, 0, 0.14), 
                0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  
  ion-icon {
    font-size: 2rem;
    font-weight: bold;
  }
}

/* Tab bar spacer for FAB */
.fab-spacer {
  opacity: 0;
  pointer-events: none;
  flex: 0 0 56px; /* Same width as FAB */
}

/* Tab button styling */
ion-tab-button {
  flex: 1;
  
  ion-label {
    font-size: 0.6rem !important;
    font-weight: 500;
  }
  
  ion-icon {
    font-size: 1.36rem;
  }
  
  /* Icon switching */
  .solid-icon {
    display: none;
  }
  
  .outline-icon {
    display: block;
  }
  
  &.tab-selected {
    .solid-icon {
      display: block;
    }
    
    .outline-icon {
      display: none;
    }
  }
}

/* Tab bar */
ion-tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: calc(env(safe-area-inset-bottom) - 9px);
  --background: white;
  background: white;
}
```

## Key Implementation Details

### 1. Hidden Spacer Tab

The spacer creates a gap in the tab bar for the FAB:

```html
<ion-tab-button class="fab-spacer" disabled="true" style="visibility: hidden;">
</ion-tab-button>
```

**CSS:**
```scss
.fab-spacer {
  opacity: 0;
  pointer-events: none;
  flex: 0 0 56px; // Same width as FAB
}
```

### 2. Centered FAB Positioning

The FAB uses fixed positioning with centering:

```scss
ion-fab.fab-center {
  position: fixed !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  bottom: 50px !important;
  z-index: 1000 !important;
}
```

### 3. Icon Switching

Each tab button contains both outline and solid icons:

```html
<ion-icon name="home-outline" class="outline-icon"></ion-icon>
<ion-icon name="home" class="solid-icon"></ion-icon>
```

**CSS toggles visibility:**
```scss
.solid-icon {
  display: none;
}

.outline-icon {
  display: block;
}

&.tab-selected {
  .solid-icon {
    display: block;
  }
  
  .outline-icon {
    display: none;
  }
}
```

### 4. iOS Safe Area Handling

Handles the home indicator on modern iPhones:

```scss
ion-tab-bar {
  padding-bottom: calc(env(safe-area-inset-bottom) - 9px);
}
```

## Customization

### Change FAB Size

```scss
ion-fab-button {
  --size: 64px; // Larger FAB
  // or
  --size: 48px; // Smaller FAB
}
```

### Change FAB Color

```scss
ion-fab-button {
  --background: #ff6b6b; // Custom color
  --background-activated: #ee5a52;
}
```

### Change Tab Icons

Replace the icon names in your HTML:

```html
<ion-icon name="heart-outline" class="outline-icon"></ion-icon>
<ion-icon name="heart" class="solid-icon"></ion-icon>
```

### Add More Tabs

Simply add more tab buttons:

```html
<ion-tab-button tab="messages">
  <ion-icon name="chatbubble-outline" class="outline-icon"></ion-icon>
  <ion-icon name="chatbubbles" class="solid-icon"></ion-icon>
  <ion-label>Messages</ion-label>
</ion-tab-button>
```

### Customize Quick Actions

Modify the action sheet buttons:

```typescript
async openQuickActions() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Create New',
    buttons: [
      {
        text: 'New Post',
        icon: 'create-outline',
        handler: () => { /* Open post modal */ }
      },
      {
        text: 'New Event',
        icon: 'calendar-outline',
        handler: () => { /* Open event modal */ }
      },
      {
        text: 'New Contact',
        icon: 'person-add-outline',
        handler: () => { /* Open contact form */ }
      },
      { text: 'Cancel', role: 'cancel' }
    ]
  });

  await actionSheet.present();
}
```

## Best Practices

### 1. Use Meaningful Icons

Choose icons that clearly represent each section:
- Home: `home-outline` / `home`
- Profile: `person-outline` / `person`
- Messages: `chatbubble-outline` / `chatbubbles`
- Settings: `settings-outline` / `settings`

### 2. Limit Tab Count

Keep tabs to 4-5 maximum for usability:
- Too many tabs make labels hard to read
- 4 tabs + FAB is the sweet spot

### 3. Consistent Icon Style

Use either:
- **Outline/Solid pairs** (recommended)
- **Outline only** (simpler)
- **Solid only** (less visual feedback)

### 4. FAB Should Be Primary Action

The FAB should trigger the most common action:
- Create new item
- Add content
- Quick compose
- Primary workflow

### 5. Test on Real Devices

The safe area handling only works on physical devices:
- Test on iPhone with home indicator
- Test on Android with gesture navigation
- Test on tablets

## Common Patterns

### Pattern 1: Social Media App

```typescript
// Tabs: Home, Search, Add (FAB), Activity, Profile
// FAB: Create new post
```

### Pattern 2: Productivity App

```typescript
// Tabs: Tasks, Calendar, Add (FAB), Projects, Settings
// FAB: Quick add task
```

### Pattern 3: E-commerce App

```typescript
// Tabs: Home, Browse, Cart (FAB), Wishlist, Account
// FAB: View cart
```

### Pattern 4: Messaging App

```typescript
// Tabs: Chats, Contacts, Compose (FAB), Calls, Settings
// FAB: New message
```

## Troubleshooting

### FAB Not Centered

Check that you have:
1. `left: 50%` and `transform: translateX(-50%)`
2. No conflicting CSS on parent elements
3. Correct z-index (above tab bar)

### Icons Not Switching

Verify:
1. Both outline and solid icons are present
2. `.tab-selected` class is being applied
3. CSS specificity is correct

### Tab Bar Overlaps Content

Add padding to your content:
```scss
ion-content {
  padding-bottom: 80px; // Space for tab bar + FAB
}
```

### Safe Area Not Working

Ensure:
1. Testing on physical device (not simulator)
2. CSS uses `env(safe-area-inset-bottom)`
3. Proper viewport meta tag in index.html

## Accessibility

### ARIA Labels

```html
<ion-tab-button tab="home" aria-label="Home">
  <ion-icon name="home-outline" aria-hidden="true"></ion-icon>
  <ion-label>Home</ion-label>
</ion-tab-button>
```

### Keyboard Navigation

Tab buttons are keyboard accessible by default. The FAB should also be:

```html
<ion-fab-button 
  (click)="openQuickActions()"
  aria-label="Quick actions menu">
  <ion-icon name="add-outline"></ion-icon>
</ion-fab-button>
```

## Performance

- Tab switching is instant (no routing overhead in demo)
- Icon switching uses CSS (no re-rendering)
- FAB uses Ionic's optimized fab-button component
- Action sheet lazy loads on first open

## Browser Support

- ✅ iOS Safari 12+
- ✅ Android Chrome 60+
- ✅ Desktop Chrome/Firefox/Safari
- ✅ PWA support

## License

This component is part of the UpStart MobileComponents library.

---

**Perfect for:** Social apps, productivity apps, e-commerce, messaging apps, and any app needing quick access to primary actions! 🚀

