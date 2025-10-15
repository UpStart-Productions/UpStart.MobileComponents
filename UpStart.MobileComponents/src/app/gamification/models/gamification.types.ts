/**
 * Gamification System Type Definitions
 */

export interface GamificationAchievement {
  id: number;
  triggerKey: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  celebrationTier: 'micro' | 'small' | 'medium' | 'major';
  hapticType: 'light' | 'medium' | 'success';
  maxFrequency: 'unlimited' | 'daily' | 'once' | 'milestone';
  coinColor: string; // hex code like '#ff6b6b'
  isActive: boolean;
}

export interface CoinEarnedEvent {
  achievement: GamificationAchievement;
  timestamp: Date;
  celebrationTier: 'micro' | 'small' | 'medium' | 'major';
  hapticType: 'light' | 'medium' | 'success';
}

export type HapticType = 'light' | 'medium' | 'success';

