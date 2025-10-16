# Video Assets for Video Header Demo

✅ **Video files have been included!** The demo comes with 12 beautiful nature videos (65MB total).

## Included Video Files

The following videos are already in `src/assets/videos/`:

```
src/assets/videos/
├── water-1.mov      (5.7MB)  - Flowing water
├── water-3.mov      (5.6MB)  - Water ripples
├── water-4.mov      (14MB)   - Ocean waves
├── water-5.mov      (3.5MB)  - Calm water
├── trees-1.mov      (7.9MB)  - Swaying trees
├── grass-1.mov      (8.8MB)  - Grass movement
├── plant-1.mov      (5.1MB)  - Plant leaves
├── forest-1.mov     (3.5MB)  - Forest canopy
├── forest-2.mov     (1.6MB)  - Forest sunlight
├── forest-3.mov     (2.9MB)  - Forest scene
├── tropical-1.mov   (4.3MB)  - Tropical plants
└── tropical-2.mov   (2.5MB)  - Tropical leaves
```

**Total Size:** ~65MB
**Format:** H.264 .mov files (iOS/Android compatible)

## Video Specifications

- **Format**: `.mov` (iOS), `.mp4` (Android/Web), or `.webm` (Web)
- **Codec**: H.264 recommended for broad compatibility
- **Resolution**: 1080p or 720p
- **Frame Rate**: 24-30fps
- **Duration**: 10-30 seconds (for seamless loops)
- **File Size**: Keep under 5MB per video for best performance
- **Aspect Ratio**: 16:9 or match your device screen

## Where to Get Video Assets

### Free Stock Video Sites

1. **Pexels Videos** - https://www.pexels.com/videos/
   - High-quality free stock videos
   - No attribution required
   - Search terms: "water flowing", "nature loop", "abstract motion"

2. **Pixabay Videos** - https://pixabay.com/videos/
   - Free videos under Pixabay License
   - Great nature and abstract content

3. **Videvo** - https://www.videvo.net/
   - Free stock footage
   - Some require attribution

4. **Coverr** - https://coverr.co/
   - Beautiful, free videos for websites
   - Updated weekly

### Recommended Search Terms

- "water flowing loop"
- "peaceful nature"
- "abstract gradient"
- "bokeh lights"
- "grass swaying"
- "forest canopy"
- "ocean waves"

## Video Optimization

Before adding videos to your project, optimize them:

### Using FFmpeg (Command Line)

```bash
# Convert and compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4

# Create a shorter loop (first 15 seconds)
ffmpeg -i input.mp4 -t 15 -c copy output.mp4

# Reduce resolution to 720p
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 output.mp4
```

### Using Online Tools

- **CloudConvert** - https://cloudconvert.com/
- **Online-Convert** - https://www.online-convert.com/
- **Kapwing** - https://www.kapwing.com/

## Placeholder Videos (For Testing)

If you need to test without actual video files, you can use:

1. **Solid Color Video**: Create a simple colored background
2. **Video Hosting**: Use a CDN URL temporarily
3. **Canvas Animation**: Replace `<video>` with Canvas element

### Example: Solid Color Fallback

```typescript
// In your component
selectedVideo: string = '';

ngOnInit() {
  // Check if video file exists, otherwise use fallback
  this.selectedVideo = 'assets/videos/water-1.mov';
}
```

```html
<!-- Add error handling -->
<video
  (error)="onVideoError($event)"
  [src]="selectedVideo"
></video>
```

```typescript
onVideoError(event: any) {
  console.warn('Video failed to load, using fallback');
  // Show gradient background instead
  this.useVideoFallback = true;
}
```

## Adding Videos to Your Project

1. Create the directory:
   ```bash
   mkdir -p src/assets/videos
   ```

2. Download and optimize your videos

3. Copy them to `src/assets/videos/`

4. Update the `availableVideos` array in the component:
   ```typescript
   availableVideos: string[] = [
     'assets/videos/your-video-1.mov',
     'assets/videos/your-video-2.mov',
     'assets/videos/your-video-3.mov'
   ];
   ```

5. Build and test on device

## File Size Considerations

- **Development**: Larger files are OK for testing
- **Production**: Keep total video assets under 10-15MB
- **Lazy Loading**: Consider loading videos on demand
- **CDN**: For larger apps, host videos on a CDN

## Git Considerations

Videos are large binary files. Consider:

1. **Git LFS (Large File Storage)**
   ```bash
   git lfs track "*.mov"
   git lfs track "*.mp4"
   ```

2. **.gitignore** (if using CDN)
   ```
   # Ignore local video files
   src/assets/videos/*.mov
   src/assets/videos/*.mp4
   ```

3. **Alternative**: Host videos externally and reference by URL

## Testing Without Videos

The demo will still work without video files, but:
- You'll see a blank space where the video should be
- The header transitions will still work
- Status bar integration will still function

To test the layout without videos, you can temporarily add a background color:

```scss
.video-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Need Help?

If you need specific video recommendations or help with video optimization, please refer to the main README or contact the development team.

