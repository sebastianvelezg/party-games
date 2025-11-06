import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, typography, borderRadius, shadows, spacing } from '../../config/theme';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPress }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: game.color }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={game.icon as any} size={48} color={colors.white} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{game.name}</Text>
        <Text style={styles.description}>{game.description}</Text>

        <View style={styles.footer}>
          <View style={styles.playerInfo}>
            <Ionicons name="people" size={16} color={colors.white} />
            <Text style={styles.playerText}>
              {game.minPlayers}-{game.maxPlayers} players
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.arrow}>
        <Ionicons name="chevron-forward" size={24} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  playerText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
  arrow: {
    marginLeft: spacing.sm,
  },
});
