import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '@/src/components/ui/button';
import { initializeGame, getCurrentPlayer, allPlayersRevealed } from '@/src/games/impostor/game-logic';
import { ImpostorGameState } from '@/src/games/impostor/types';
import { colors, typography, spacing, borderRadius } from '@/src/config/theme';

export default function WordRevealScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const players = JSON.parse(params.players as string) as string[];
  const categoryId = params.categoryId as string;
  const impostorCount = parseInt(params.impostorCount as string);
  const isCustom = params.isCustom === 'true';
  const customWords = params.customWords ? JSON.parse(params.customWords as string) : undefined;

  const [gameState, setGameState] = useState<ImpostorGameState | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Initialize game
    const initialState = initializeGame(
      players,
      categoryId,
      impostorCount,
      isCustom,
      customWords
    );
    setGameState(initialState);
  }, []);

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentPlayer = getCurrentPlayer(gameState);
  const allRevealed = allPlayersRevealed(gameState);

  const handleReveal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRevealed(true);

    Animated.spring(flipAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();
  };

  const handleHide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRevealed(false);

    Animated.spring(flipAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();
  };

  const handleNext = () => {
    setRevealed(false);
    flipAnim.setValue(0);

    const updatedPlayers = gameState.players.map((player, index) =>
      index === gameState.currentPlayerIndex
        ? { ...player, hasRevealed: true }
        : player
    );

    setGameState({
      ...gameState,
      players: updatedPlayers,
      currentPlayerIndex: gameState.currentPlayerIndex + 1,
    });
  };

  const handleStartGame = () => {
    // Navigate to gameplay screen
    router.push({
      pathname: '/games/impostor/gameplay',
      params: {
        gameState: JSON.stringify(gameState),
      },
    });
  };

  const scale = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1],
  });

  if (!currentPlayer) {
    // All players have revealed, show start button
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.gameColors.purple, '#5B52D8']}
          style={styles.header}
        >
          <Text style={styles.title}>Ready to Play!</Text>
          <Text style={styles.subtitle}>Everyone knows their role</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
            <Text style={styles.summaryTitle}>All Set!</Text>
            <Text style={styles.summaryText}>
              {players.length} players • {impostorCount} impostor{impostorCount > 1 ? 's' : ''}
            </Text>
            <Text style={styles.summaryText}>
              Category: {gameState.categoryName}
            </Text>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>How to Play:</Text>
            <Text style={styles.instructionsText}>
              1. Discuss and ask questions{'\n'}
              2. Impostors try to blend in{'\n'}
              3. Figure out who doesn't know the word{'\n'}
              4. Vote for the impostor!
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Start Discussion"
            onPress={handleStartGame}
            fullWidth
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.purple, '#5B52D8']}
        style={styles.header}
      >
        <Text style={styles.title}>Pass to Player</Text>
        <Text style={styles.subtitle}>
          {gameState.currentPlayerIndex + 1} of {players.length}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.playerNameCard}>
          <Text style={styles.playerNameText}>{currentPlayer.name}</Text>
        </View>

        <Pressable
          style={styles.cardContainer}
          onPress={revealed ? handleHide : handleReveal}
          disabled={revealed}
        >
          <Animated.View
            style={[
              styles.revealCard,
              {
                transform: [{ scale }],
              },
            ]}
          >
            {!revealed ? (
              <View style={styles.cardFront}>
                <Ionicons name="eye-off" size={64} color={colors.white} />
                <Text style={styles.cardFrontText}>Tap to Reveal</Text>
                <Text style={styles.cardFrontSubtext}>
                  Don't let others see!
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.cardBack,
                  currentPlayer.isImpostor ? styles.cardBackImpostor : styles.cardBackRegular,
                ]}
              >
                {currentPlayer.isImpostor ? (
                  <>
                    <Ionicons name="alert-circle" size={80} color={colors.error} />
                    <Text style={styles.roleText}>IMPOSTOR</Text>
                    <Text style={styles.roleSubtext}>
                      You don't know the secret word.{'\n'}
                      Try to blend in and figure it out!
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="eye" size={80} color={colors.success} />
                    <Text style={styles.wordText}>{currentPlayer.word}</Text>
                    <Text style={styles.roleSubtext}>
                      This is the secret word.{'\n'}
                      Don't say it directly!
                    </Text>
                  </>
                )}
              </View>
            )}
          </Animated.View>
        </Pressable>

        {revealed && (
          <View style={styles.instructions}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.instructionsCompact}>
              Tap anywhere to hide, then pass the phone
            </Text>
          </View>
        )}
      </View>

      {!revealed && (
        <View style={styles.footer}>
          <Button
            title="Next Player"
            onPress={handleNext}
            fullWidth
          />
        </View>
      )}
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
    justifyContent: 'center',
  },
  playerNameCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  playerNameText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  revealCard: {
    width: '100%',
    aspectRatio: 0.7,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  cardFront: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  cardFrontText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginTop: spacing.lg,
  },
  cardFrontSubtext: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    opacity: 0.8,
    marginTop: spacing.sm,
  },
  cardBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  cardBackRegular: {
    backgroundColor: colors.success,
  },
  cardBackImpostor: {
    backgroundColor: colors.error,
  },
  roleText: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  wordText: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  roleSubtext: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.md,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.info + '20',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  instructionsCompact: {
    fontSize: typography.fontSize.sm,
    color: colors.info,
    flex: 1,
  },
  instructionsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  instructionsText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  summaryTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
