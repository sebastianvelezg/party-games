import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { GameCard } from '@/src/components/ui/game-card';
import { getAllGames } from '@/src/config/games';
import { colors, typography, spacing } from '@/src/config/theme';

export default function HomeScreen() {
  const router = useRouter();
  const games = getAllGames();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>🎉 Party Games</Text>
        <Text style={styles.subtitle}>Choose a game to get started!</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onPress={() => router.push(game.route as any)}
          />
        ))}

        {games.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No games available yet!</Text>
            <Text style={styles.emptySubtext}>Check back soon for updates</Text>
          </View>
        )}
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
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
  },
  emptyText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
});
