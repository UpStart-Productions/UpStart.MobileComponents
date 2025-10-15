# Android Permissions Setup

## Camera & Photo Permissions

When you add the Android platform to this project, you'll need to add camera and photo permissions to the `AndroidManifest.xml` file.

## Adding Android Platform

If you haven't already, add Android support:

```bash
npx cap add android
```

## Required Permissions

Add these permissions to your `android/app/src/main/AndroidManifest.xml` file, inside the `<manifest>` tag (before the `<application>` tag):

```xml
<!-- Camera & Photo Permissions -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
                 android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

<!-- Camera feature (optional - marks app as requiring camera in Play Store) -->
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

## Example AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Camera & Photo Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
                     android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        
        <!-- Your activities and other app components -->
        
    </application>

</manifest>
```

## Android 13+ (API 33+) Considerations

For Android 13 and above, the `READ_MEDIA_IMAGES` permission is required for accessing photos. The old `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE` permissions are deprecated for media files on Android 13+.

The permissions above handle both older and newer Android versions:
- Android 12 and below: Uses `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE`
- Android 13+: Uses `READ_MEDIA_IMAGES`

## Runtime Permissions

The Capacitor Camera plugin automatically handles requesting runtime permissions from the user when they try to use the camera or photo library. You don't need to write any additional permission request code - it's built into the plugin!

## Testing

After adding Android and the permissions:

1. Sync your project: `npx cap sync android`
2. Open Android Studio: `npx cap open android`
3. Run the app on a device or emulator
4. Navigate to the Rich Text Editor
5. Tap the camera or photo button
6. You should see a permission dialog on first use

## Verification

To verify permissions are correctly set:

1. Open `android/app/src/main/AndroidManifest.xml`
2. Confirm the permissions listed above are present
3. Build the app: `npx cap sync android && npx cap open android`
4. Check the merged manifest in Android Studio:
   - Build → Generate Signed Bundle / APK → View Merged Manifest
   - All permissions should be visible

---

**Note**: These permissions are already configured for iOS in `ios/App/App/Info.plist`.


