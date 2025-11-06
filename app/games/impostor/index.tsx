import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { recentPlayersStorage } from '@/src/utils/storage';
import { colors, typography, spacing, borderRadius } from '@/src/config/theme';

export default function PlayerSetupScreen() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [recentPlayers, setRecentPlayers] = useState<string[]>([]);

  useEffect(() => {
    loadRecentPlayers();
  }, []);

  const loadRecentPlayers = async () => {
    const recent = await recentPlayersStorage.get();
    setRecentPlayers(recent);
  };

  const addPlayer = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      Alert.alert('Error', 'Please enter a player name');
      return;
    }

    if (players.includes(trimmedName)) {
      Alert.alert('Error', 'This player has already been added');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayers([...players, trimmedName]);
    setPlayerName('');
  };

  const removePlayer = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayers(players.filter((_, i) => i !== index));
  };

  const addRecentPlayer = (name: string) => {
    if (!players.includes(name)) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setPlayers([...players, name]);
    }
  };

  const handleContinue = async () => {
    if (players.length < 3) {
      Alert.alert('Not Enough Players', 'You need at least 3 players to start the game');
      return;
    }

    // Save players to recent
    await recentPlayersStorage.add(players);

    // Navigate to category selection with players
    router.push({
      pathname: '/games/impostor/category-select',
      params: { players: JSON.stringify(players) },
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.purple, '#5B52D8']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>🎭 The Impostor</Text>
        <Text style={styles.subtitle}>Add players to get started</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.inputCard}>
          <Text style={styles.label}>Player Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Enter player name"
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={addPlayer}
              returnKeyType="done"
              autoCapitalize="words"
            />
            <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
              <Ionicons name="add-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {players.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Players ({players.length})
            </Text>
            {players.map((player, index) => (
              <Card key={index} style={styles.playerCard}>
                <View style={styles.playerRow}>
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNumber}>
                      <Text style={styles.playerNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.playerName}>{player}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removePlayer(index)}>
                    <Ionicons
                      name="close-circle"
                      size={24}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {recentPlayers.length > 0 && players.length < 12 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Players</Text>
            <View style={styles.chipContainer}>
              {recentPlayers
                .filter((name) => !players.includes(name))
                .slice(0, 10)
                .map((name, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.chip}
                    onPress={() => addRecentPlayer(name)}
                  >
                    <Text style={styles.chipText}>{name}</Text>
                    <Ionicons name="add" size={16} color={colors.primary} />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={colors.info} />
          <Text style={styles.infoText}>
            3-12 players • The more the merrier!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue with ${players.length} player${players.length !== 1 ? 's' : ''}`}
          onPress={handleContinue}
          disabled={players.length < 3}
          fullWidth
        />
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
  backButton: {
    marginBottom: spacing.md,
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
  inputCard: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  addButton: {
    padding: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  playerCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  playerNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerNumberText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  playerName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.info + '20',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.info,
    flex: 1,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
