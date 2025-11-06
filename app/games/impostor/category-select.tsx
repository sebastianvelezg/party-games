import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { CATEGORIES } from '@/src/games/impostor/categories';
import { colors, typography, spacing, borderRadius } from '@/src/config/theme';

export default function CategorySelectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const players = JSON.parse(params.players as string) as string[];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [impostorCount, setImpostorCount] = useState(1);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customWords, setCustomWords] = useState('');

  const maxImpostors = Math.floor(players.length / 2) - 1;

  const handleCategorySelect = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategoryId(categoryId);
  };

  const handleCustomCategory = () => {
    setShowCustomModal(true);
  };

  const handleCustomCategorySubmit = () => {
    const words = customWords
      .split('\n')
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (words.length < 5) {
      Alert.alert('Not Enough Words', 'Please add at least 5 words for the custom category');
      return;
    }

    setShowCustomModal(false);

    // Navigate to word reveal with custom words
    router.push({
      pathname: '/games/impostor/word-reveal',
      params: {
        players: JSON.stringify(players),
        categoryId: 'custom',
        impostorCount: impostorCount.toString(),
        isCustom: 'true',
        customWords: JSON.stringify(words),
      },
    });
  };

  const handleContinue = () => {
    if (!selectedCategoryId) {
      Alert.alert('Select Category', 'Please select a category to continue');
      return;
    }

    router.push({
      pathname: '/games/impostor/word-reveal',
      params: {
        players: JSON.stringify(players),
        categoryId: selectedCategoryId,
        impostorCount: impostorCount.toString(),
        isCustom: 'false',
      },
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.purple, '#5B52D8']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Category</Text>
        <Text style={styles.subtitle}>
          {players.length} players • {impostorCount} impostor{impostorCount > 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Impostor Count Selector */}
        <Card style={styles.impostorCard}>
          <Text style={styles.cardTitle}>Number of Impostors</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, impostorCount <= 1 && styles.counterButtonDisabled]}
              onPress={() => {
                if (impostorCount > 1) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setImpostorCount(impostorCount - 1);
                }
              }}
              disabled={impostorCount <= 1}
            >
              <Ionicons
                name="remove"
                size={24}
                color={impostorCount <= 1 ? colors.disabled : colors.white}
              />
            </TouchableOpacity>

            <View style={styles.counterValue}>
              <Text style={styles.counterText}>{impostorCount}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.counterButton,
                impostorCount >= maxImpostors && styles.counterButtonDisabled,
              ]}
              onPress={() => {
                if (impostorCount < maxImpostors) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setImpostorCount(impostorCount + 1);
                }
              }}
              disabled={impostorCount >= maxImpostors}
            >
              <Ionicons
                name="add"
                size={24}
                color={impostorCount >= maxImpostors ? colors.disabled : colors.white}
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>

          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Card
                style={[
                  styles.categoryCard,
                  selectedCategoryId === category.id && styles.categoryCardSelected,
                ]}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon as any} size={28} color={colors.primary} />
                </View>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.words.length} words</Text>
                </View>
                {selectedCategoryId === category.id && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                )}
              </Card>
            </TouchableOpacity>
          ))}

          {/* Custom Category Option */}
          <TouchableOpacity onPress={handleCustomCategory}>
            <Card style={styles.customCard}>
              <View style={[styles.categoryIcon, styles.customIcon]}>
                <Ionicons name="create" size={28} color={colors.accent} />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName}>Custom Category</Text>
                <Text style={styles.categoryCount}>Add your own words</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Start Game"
          onPress={handleContinue}
          disabled={!selectedCategoryId}
          fullWidth
        />
      </View>

      {/* Custom Category Modal */}
      <Modal
        visible={showCustomModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Custom Category</Text>
              <TouchableOpacity onPress={() => setShowCustomModal(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Enter your custom words (one per line). You need at least 5 words.
            </Text>

            <TextInput
              style={styles.customInput}
              value={customWords}
              onChangeText={setCustomWords}
              placeholder="Pizza&#10;Burger&#10;Sushi&#10;Tacos&#10;Pasta"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <View style={styles.modalFooter}>
              <Button
                title="Cancel"
                onPress={() => setShowCustomModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Start Game"
                onPress={handleCustomCategorySubmit}
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
  impostorCard: {
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  counterValue: {
    minWidth: 60,
    alignItems: 'center',
  },
  counterText: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
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
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  categoryCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  customCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  customIcon: {
    backgroundColor: colors.accent + '20',
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
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  modalDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  customInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text,
    minHeight: 200,
    marginBottom: spacing.lg,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
});
