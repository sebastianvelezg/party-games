import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, GameSession } from '../types';

const STORAGE_KEYS = {
  SETTINGS: '@party_games_settings',
  GAME_HISTORY: '@party_games_history',
  RECENT_PLAYERS: '@party_games_recent_players',
};

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  keepScreenAwake: true,
  theme: 'auto',
  defaultTimerDuration: 180, // 3 minutes in seconds
};

// Settings Storage
export const settingsStorage = {
  async get(): Promise<AppSettings> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (value) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(value) };
      }
      return DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  async save(settings: Partial<AppSettings>): Promise<void> {
    try {
      const current = await this.get();
      const updated = { ...current, ...settings };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  async reset(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  },
};

// Game History Storage
export const gameHistoryStorage = {
  async getAll(): Promise<GameSession[]> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading game history:', error);
      return [];
    }
  },

  async add(session: GameSession): Promise<void> {
    try {
      const history = await this.getAll();
      history.unshift(session); // Add to beginning

      // Keep only last 50 sessions
      const trimmed = history.slice(0, 50);

      await AsyncStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error adding game session:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing game history:', error);
      throw error;
    }
  },

  async getByGameId(gameId: string): Promise<GameSession[]> {
    try {
      const history = await this.getAll();
      return history.filter((session) => session.gameId === gameId);
    } catch (error) {
      console.error('Error getting game history by ID:', error);
      return [];
    }
  },
};

// Recent Players Storage
export const recentPlayersStorage = {
  async get(): Promise<string[]> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_PLAYERS);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading recent players:', error);
      return [];
    }
  },

  async add(playerNames: string[]): Promise<void> {
    try {
      const recent = await this.get();

      // Add new players and remove duplicates
      const updated = [...new Set([...playerNames, ...recent])];

      // Keep only last 20 unique names
      const trimmed = updated.slice(0, 20);

      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_PLAYERS, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error adding recent players:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_PLAYERS, JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing recent players:', error);
      throw error;
    }
  },
};

// Clear all app data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SETTINGS,
      STORAGE_KEYS.GAME_HISTORY,
      STORAGE_KEYS.RECENT_PLAYERS,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};
