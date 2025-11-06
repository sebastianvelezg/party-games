import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SettingItem } from '@/src/components/ui/setting-item';
import { Button } from '@/src/components/ui/button';
import { settingsStorage, gameHistoryStorage, recentPlayersStorage } from '@/src/utils/storage';
import { AppSettings } from '@/src/types';
import { colors, typography, spacing } from '@/src/config/theme';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    hapticsEnabled: true,
    keepScreenAwake: true,
    theme: 'auto',
    defaultTimerDuration: 180,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const loaded = await settingsStorage.get();
    setSettings(loaded);
  };

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await settingsStorage.save({ [key]: value });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear Game History',
      'Are you sure you want to clear all game history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await gameHistoryStorage.clear();
            Alert.alert('Success', 'Game history cleared!');
          },
        },
      ]
    );
  };

  const handleClearRecentPlayers = () => {
    Alert.alert(
      'Clear Recent Players',
      'Are you sure you want to clear all recent player names?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await recentPlayersStorage.clear();
            Alert.alert('Success', 'Recent players cleared!');
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset All Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await settingsStorage.reset();
            await loadSettings();
            Alert.alert('Success', 'Settings reset to defaults!');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.secondary, colors.secondaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>⚙️ Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <SettingItem
            icon="volume-high"
            title="Sound Effects"
            description="Play sounds during gameplay"
            value={settings.soundEnabled}
            onValueChange={(value) => updateSetting('soundEnabled', value)}
          />

          <SettingItem
            icon="phone-portrait"
            title="Haptic Feedback"
            description="Feel vibrations on interactions"
            value={settings.hapticsEnabled}
            onValueChange={(value) => updateSetting('hapticsEnabled', value)}
          />

          <SettingItem
            icon="sunny"
            title="Keep Screen Awake"
            description="Prevent screen from dimming during games"
            value={settings.keepScreenAwake}
            onValueChange={(value) => updateSetting('keepScreenAwake', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>

          <SettingItem
            icon="trash"
            title="Clear Game History"
            description="Remove all saved game sessions"
            type="button"
            onPress={handleClearHistory}
            showChevron
          />

          <SettingItem
            icon="people"
            title="Clear Recent Players"
            description="Remove saved player names"
            type="button"
            onPress={handleClearRecentPlayers}
            showChevron
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced</Text>

          <SettingItem
            icon="refresh"
            title="Reset All Settings"
            description="Restore default settings"
            type="button"
            onPress={handleResetSettings}
            showChevron
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Party Games v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for great parties</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  version: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
