import { SettingItem } from "@/src/components/ui/setting-item";
import { colors, effects, layout, typography } from "@/src/config/theme";
import { AppSettings } from "@/src/types";
import {
  gameHistoryStorage,
  recentPlayersStorage,
  settingsStorage,
} from "@/src/utils/storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    hapticsEnabled: true,
    keepScreenAwake: true,
    theme: "auto",
    defaultTimerDuration: 180,
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    loadSettings();

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
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
      "🗑️ Clear Game History",
      "Are you sure you want to clear all game history? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await gameHistoryStorage.clear();
            Alert.alert("✨ Success", "Game history cleared!");
          },
        },
      ]
    );
  };

  const handleClearRecentPlayers = () => {
    Alert.alert(
      "👥 Clear Recent Players",
      "Are you sure you want to clear all recent player names?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await recentPlayersStorage.clear();
            Alert.alert("✨ Success", "Recent players cleared!");
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      "⚙️ Reset All Settings",
      "Are you sure you want to reset all settings to default?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await settingsStorage.reset();
            await loadSettings();
            Alert.alert("✨ Success", "Settings reset to defaults!");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Enhanced gradient header */}
      <LinearGradient
        colors={[colors.secondary, colors.primaryDark, "#2E1065"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Decorative overlay pattern */}
        <View style={styles.headerPattern} />

        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.emoji}>⚙️</Text>
          </View>

          <View style={styles.subtitleContainer}>
            <View style={styles.accentDot} />
            <Text style={styles.subtitle}>Customize your experience</Text>
            <View style={styles.accentDot} />
          </View>
        </Animated.View>

        {/* Curved bottom edge */}
        <View style={styles.headerCurve} />
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: Animated.multiply(slideAnim, 1.5) }],
          }}
        >
          {/* Preferences Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🎮</Text>
              <Text style={styles.sectionTitle}>Preferences</Text>
            </View>

            <View style={styles.card}>
              <SettingItem
                icon="volume-high"
                title="Sound Effects"
                description="Play sounds during gameplay"
                value={settings.soundEnabled}
                onValueChange={(value) => updateSetting("soundEnabled", value)}
              />

              <View style={styles.divider} />

              <SettingItem
                icon="phone-portrait"
                title="Haptic Feedback"
                description="Feel vibrations on interactions"
                value={settings.hapticsEnabled}
                onValueChange={(value) =>
                  updateSetting("hapticsEnabled", value)
                }
              />

              <View style={styles.divider} />

              <SettingItem
                icon="sunny"
                title="Keep Screen Awake"
                description="Prevent screen from dimming during games"
                value={settings.keepScreenAwake}
                onValueChange={(value) =>
                  updateSetting("keepScreenAwake", value)
                }
              />
            </View>
          </View>

          {/* Data Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>💾</Text>
              <Text style={styles.sectionTitle}>Data Management</Text>
            </View>

            <View style={styles.card}>
              <SettingItem
                icon="trash"
                title="Clear Game History"
                description="Remove all saved game sessions"
                type="button"
                onPress={handleClearHistory}
                showChevron
              />

              <View style={styles.divider} />

              <SettingItem
                icon="people"
                title="Clear Recent Players"
                description="Remove saved player names"
                type="button"
                onPress={handleClearRecentPlayers}
                showChevron
              />
            </View>
          </View>

          {/* Advanced Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🔧</Text>
              <Text style={styles.sectionTitle}>Advanced</Text>
            </View>

            <View style={[styles.card, styles.dangerCard]}>
              <SettingItem
                icon="refresh"
                title="Reset All Settings"
                description="Restore default settings"
                type="button"
                onPress={handleResetSettings}
                showChevron
              />
            </View>
          </View>

          {/* Footer */}
          <Animated.View
            style={[
              styles.footer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.footerBadge}>
              <Text style={styles.version}>Party Games</Text>
              <View style={styles.versionDot} />
              <Text style={styles.version}>v1.0.0</Text>
            </View>
            <Text style={styles.footerText}>
              Made with ❤️ for great parties
            </Text>

            {/* Decorative elements */}
            <View style={styles.footerDecoration}>
              <View style={styles.decorationLine} />
              <Text style={styles.decorationEmoji}>🎉</Text>
              <View style={styles.decorationLine} />
            </View>
          </Animated.View>
        </Animated.View>
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
    paddingTop: Platform.OS === "ios" ? 60 : 50,
    paddingBottom: layout.spacing["10"],
    paddingHorizontal: layout.spacing["6"],
    position: "relative",
    ...effects.shadows.xl,
    shadowColor: colors.secondary,
  },
  headerPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: effects.opacity["10"],
    backgroundColor: "transparent",
  },
  headerCurve: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: colors.background,
    borderTopLeftRadius: layout.borderRadius["3xl"],
    borderTopRightRadius: layout.borderRadius["3xl"],
  },
  headerContent: {
    alignItems: "center",
    zIndex: 1,
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: layout.spacing["4"],
  },
  title: {
    fontSize: typography.fontSize["5xl"],
    fontWeight: typography.fontWeight.black,
    color: colors.text,
    letterSpacing: typography.letterSpacing.tight,
    textShadowColor: "rgba(236, 72, 153, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  emoji: {
    fontSize: typography.fontSize["4xl"],
    marginTop: layout.spacing["2"],
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.spacing["3"],
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.wide,
    fontWeight: typography.fontWeight.medium,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.accent,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: layout.spacing["6"],
    paddingHorizontal: layout.spacing["5"],
    paddingBottom: layout.spacing["10"],
  },
  section: {
    marginBottom: layout.spacing["8"],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing["4"],
    marginLeft: layout.spacing["1"],
  },
  sectionIcon: {
    fontSize: typography.fontSize["xl"],
    marginRight: layout.spacing["2"],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    letterSpacing: typography.letterSpacing.normal,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.xl,
    padding: layout.spacing["1"],
    ...effects.shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dangerCard: {
    borderColor: `${colors.error}30`,
    backgroundColor: `${colors.error}08`,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: layout.spacing["4"],
    marginVertical: layout.spacing["1"],
  },
  footer: {
    alignItems: "center",
    paddingTop: layout.spacing["12"],
    paddingBottom: layout.spacing["8"],
  },
  footerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: layout.spacing["4"],
    paddingVertical: layout.spacing["2"],
    borderRadius: layout.borderRadius.full,
    marginBottom: layout.spacing["3"],
  },
  version: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  versionDot: {
    width: 4,
    height: 4,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.primary,
    marginHorizontal: layout.spacing["2"],
    opacity: effects.opacity["60"],
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    marginBottom: layout.spacing["4"],
  },
  footerDecoration: {
    flexDirection: "row",
    alignItems: "center",
    gap: layout.spacing["3"],
    marginTop: layout.spacing["2"],
  },
  decorationLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.primary,
    opacity: effects.opacity["30"],
  },
  decorationEmoji: {
    fontSize: typography.fontSize.lg,
  },
});
