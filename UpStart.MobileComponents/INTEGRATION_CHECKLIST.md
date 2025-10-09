# Integration Checklist - Share Sheet Component

Use this checklist in the **other Cursor window** to wire up the extracted component.

---

## ✅ Step 1: Verify Files Are Present

Check that these files exist in `src/app/share-sheet/`:

- [ ] `services/sharing.service.ts`
- [ ] `services/email-composer.service.ts`
- [ ] `models/sharing.types.ts`
- [ ] `share-sheet.page.ts`
- [ ] `share-sheet.page.html`
- [ ] `share-sheet.page.scss`
- [ ] `README.md`

---

## ✅ Step 2: Verify Dependencies

Run this to verify packages are installed:

```bash
npm list @capacitor/share @capacitor/app-launcher capacitor-email-composer
```

Expected output should show all three packages with version numbers.

---

## ✅ Step 3: Sync Capacitor (Optional but Recommended)

If you're testing on a device or simulator:

```bash
npx cap sync
```

This ensures the native plugins are properly linked.

---

## ✅ Step 4: Build the App

```bash
npm run build
```

or for development:

```bash
npm start
```

---

## ✅ Step 5: Test in Browser

1. Navigate to http://localhost:8100 (or your dev server)
2. Click "Share Sheet Integration" from home page
3. Try all three examples
4. Click "Test HTML → Text Conversion" button

**Note:** In browser, sharing will use Web Share API if available, or show a fallback. For full testing, use a real device.

---

## ✅ Step 6: Test on Real Device (iOS)

```bash
# Open in Xcode
npx cap open ios

# Then build and run on connected device
```

**Test these:**
- [ ] Email sharing opens Mail app
- [ ] Pre-filled recipient email works
- [ ] HTML formatting preserved in email
- [ ] Text/SMS sharing opens Messages app
- [ ] Cancel button works

---

## ✅ Step 7: Test on Real Device (Android)

```bash
# Open in Android Studio
npx cap open android

# Then build and run on connected device or emulator
```

**Test these:**
- [ ] Email sharing opens default email app
- [ ] Gmail/Outlook fallback works if no default
- [ ] Text/SMS sharing shows share sheet
- [ ] Multiple messaging apps appear in share sheet

---

## 🔧 Troubleshooting

### Build Errors

If you see TypeScript errors:

```bash
# Clear and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Import Errors

If services can't be found, check:
1. Files are in correct location
2. Import paths are correct
3. Services are using `providedIn: 'root'`

### Plugin Errors

If Capacitor plugins fail:

```bash
# Reinstall plugins
npm uninstall @capacitor/share @capacitor/app-launcher capacitor-email-composer
npm install @capacitor/share @capacitor/app-launcher capacitor-email-composer
npx cap sync
```

---

## 📝 Next Steps

Once everything is working:

1. **Customize** - Modify the email body template in `sharing.service.ts`
2. **Extend** - Add more sharing options (PDF, social media, etc.)
3. **Document** - Add any app-specific notes to the README
4. **Share** - Use this component in your production apps!

---

## 🎯 Success Criteria

You'll know it's working when:

✅ Home page shows "Share Sheet Integration"  
✅ Demo page loads without errors  
✅ Action sheet appears when clicking share buttons  
✅ Email composer opens with content  
✅ SMS/text sharing works  
✅ No console errors  

---

## 💡 Using in Your Own Components

To use this in other parts of your app:

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharingService } from '../share-sheet/services/sharing.service';

@Component({
  selector: 'app-my-page',
  template: `
    <div #myContent>
      <h1>My Content</h1>
      <p>This will be shared</p>
    </div>
    <ion-button (click)="share()">Share</ion-button>
  `
})
export class MyPage {
  @ViewChild('myContent') myContent!: ElementRef;

  constructor(private sharingService: SharingService) {}

  async share() {
    await this.sharingService.shareContent({
      title: 'My Content',
      contentElement: this.myContent
    });
  }
}
```

---

## 📖 Full Documentation

See `src/app/share-sheet/README.md` for:
- Complete API reference
- All interface definitions
- Advanced examples
- Customization guide
- Platform-specific notes

---

**Ready to go! Switch to the other Cursor window and start testing!** 🚀

