import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/src/components/ui/button';
import { colors, typography, spacing } from '@/src/config/theme';

export default function ImpostorGameScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.purple, '#5B52D8']}
        style={styles.header}
      >
        <Text style={styles.title}>🎭 The Impostor</Text>
        <Text style={styles.subtitle}>Find who doesn't know the secret word</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>Coming Soon!</Text>
          <Text style={styles.placeholderText}>
            This game is currently under development.
          </Text>
          <Text style={styles.placeholderText}>
            The full game experience will be added in the next update.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back to Games"
            onPress={() => router.back()}
            variant="primary"
            fullWidth
          />
        </View>
      </View>
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
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  placeholderTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  placeholderText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  buttonContainer: {
    paddingBottom: spacing.xl,
  },
});
