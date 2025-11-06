import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Timer } from '@/src/components/ui/timer';
import { ImpostorGameState } from '@/src/games/impostor/types';
import { getImpostors, getRegularPlayers } from '@/src/games/impostor/game-logic';
import { gameHistoryStorage, settingsStorage } from '@/src/utils/storage';
import { colors, typography, spacing, borderRadius } from '@/src/config/theme';

export default function GameplayScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const gameState = JSON.parse(params.gameState as string) as ImpostorGameState;

  const [timerDuration, setTimerDuration] = useState(180); // 3 minutes default
  const [timerRunning, setTimerRunning] = useState(false);
  const [showRevealModal, setShowRevealModal] = useState(false);

  useEffect(() => {
    loadTimerDuration();
  }, []);

  const loadTimerDuration = async () => {
    const settings = await settingsStorage.get();
    setTimerDuration(settings.defaultTimerDuration);
  };

  const handleTimerComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Time\'s Up!',
      'The discussion time has ended. Ready to vote?',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleStartTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimerRunning(true);
  };

  const handleRevealRoles = () => {
    setShowRevealModal(true);
  };

  const handleEndGame = async () => {
    // Save game session to history
    await gameHistoryStorage.add({
      id: Date.now().toString(),
      gameId: 'impostor',
      gameName: 'The Impostor',
      players: gameState.players.map((p) => p.name),
      date: new Date().toISOString(),
      duration: timerDuration,
    });

    // Navigate back to home
    router.push('/');
  };

  const handlePlayAgain = () => {
    // Navigate back to player setup
    router.push('/games/impostor');
  };

  const impostors = getImpostors(gameState);
  const regularPlayers = getRegularPlayers(gameState);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.purple, '#5B52D8']}
        style={styles.header}
      >
        <Text style={styles.title}>🎭 Discussion Time</Text>
        <Text style={styles.subtitle}>Find the impostor!</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Card */}
        <Card style={styles.timerCard}>
          <Timer
            duration={timerDuration}
            onComplete={handleTimerComplete}
            autoStart={false}
            isPaused={!timerRunning}
          />

          {!timerRunning && (
            <Button
              title="Start Timer"
              onPress={handleStartTimer}
              variant="primary"
              style={styles.startButton}
            />
          )}
        </Card>

        {/* Game Info */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>Players</Text>
              <Text style={styles.infoValue}>{gameState.players.length}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Ionicons name="alert-circle" size={24} color={colors.error} />
              <Text style={styles.infoLabel}>Impostors</Text>
              <Text style={styles.infoValue}>{gameState.impostorCount}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Ionicons name="pricetag" size={24} color={colors.accent} />
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{gameState.categoryName}</Text>
            </View>
          </View>
        </Card>

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>💡 Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.tipText}>Ask indirect questions about the word</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.tipText}>Watch for vague or nervous answers</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.tipText}>Impostors: listen carefully and blend in!</Text>
            </View>
          </View>
        </Card>

        {/* Player List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Players</Text>
          {gameState.players.map((player, index) => (
            <Card key={player.id} style={styles.playerCard}>
              <View style={styles.playerRow}>
                <View style={styles.playerNumber}>
                  <Text style={styles.playerNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Reveal Roles"
          onPress={handleRevealRoles}
          variant="secondary"
          fullWidth
        />
      </View>

      {/* Reveal Modal */}
      <Modal
        visible={showRevealModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRevealModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Game Results</Text>
              <TouchableOpacity onPress={() => setShowRevealModal(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {/* Secret Word */}
              <Card style={styles.secretWordCard}>
                <Text style={styles.secretWordLabel}>Secret Word</Text>
                <Text style={styles.secretWord}>{gameState.secretWord}</Text>
              </Card>

              {/* Impostors */}
              <View style={styles.roleSection}>
                <Text style={styles.roleSectionTitle}>
                  🎭 Impostors ({impostors.length})
                </Text>
                {impostors.map((player) => (
                  <Card key={player.id} style={[styles.roleCard, styles.impostorCard]}>
                    <Ionicons name="alert-circle" size={24} color={colors.error} />
                    <Text style={styles.roleCardName}>{player.name}</Text>
                  </Card>
                ))}
              </View>

              {/* Regular Players */}
              <View style={styles.roleSection}>
                <Text style={styles.roleSectionTitle}>
                  ✅ Regular Players ({regularPlayers.length})
                </Text>
                {regularPlayers.map((player) => (
                  <Card key={player.id} style={[styles.roleCard, styles.regularCard]}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                    <Text style={styles.roleCardName}>{player.name}</Text>
                  </Card>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                title="Play Again"
                onPress={handlePlayAgain}
                variant="primary"
                style={styles.modalButton}
              />
              <Button
                title="Exit Game"
                onPress={handleEndGame}
                variant="outline"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  timerCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  startButton: {
    marginTop: spacing.lg,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  infoValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xs / 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  instructionsCard: {
    marginBottom: spacing.lg,
  },
  instructionsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipsList: {
    gap: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
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
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  modalScroll: {
    maxHeight: 400,
  },
  secretWordCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.primary + '20',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secretWordLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  secretWord: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  roleSection: {
    marginBottom: spacing.lg,
  },
  roleSectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  impostorCard: {
    backgroundColor: colors.error + '20',
    borderWidth: 1,
    borderColor: colors.error,
  },
  regularCard: {
    backgroundColor: colors.success + '20',
    borderWidth: 1,
    borderColor: colors.success,
  },
  roleCardName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
});
