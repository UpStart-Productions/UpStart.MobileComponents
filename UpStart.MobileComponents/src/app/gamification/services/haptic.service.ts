import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { HapticType } from '../models/gamification.types';

@Injectable({
  providedIn: 'root'
})
export class HapticService {
  private isNative = Capacitor.isNativePlatform();

  /**
   * Trigger haptic feedback based on type
   */
  async triggerHaptic(hapticType: HapticType): Promise<void> {
    if (!this.isNative) {
      console.log(`📱 Haptic feedback (${hapticType}) - web platform, skipping`);
      return;
    }

    try {
      switch (hapticType) {
        case 'light':
          await Haptics.impact({ style: ImpactStyle.Light });
          break;
        case 'medium':
          await Haptics.impact({ style: ImpactStyle.Medium });
          break;
        case 'success':
          await Haptics.notification({ type: NotificationType.Success });
          break;
        default:
          await Haptics.impact({ style: ImpactStyle.Light });
      }
      console.log(`📱 Haptic feedback triggered: ${hapticType}`);
    } catch (error) {
      console.warn('⚠️ Haptic feedback failed:', error);
    }
  }

  /**
   * Test all haptic types
   */
  async testAllHaptics(): Promise<void> {
    console.log('🧪 Testing all haptic types...');
    
    await this.triggerHaptic('light');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await this.triggerHaptic('medium');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await this.triggerHaptic('success');
    
    console.log('✅ Haptic testing complete');
  }

  /**
   * Check if haptics are supported
   */
  isSupported(): boolean {
    return this.isNative;
  }
}


