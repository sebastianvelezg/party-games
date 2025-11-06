import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, typography, spacing, borderRadius } from '../../config/theme';

interface SettingItemProps {
  icon: string;
  title: string;
  description?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  type?: 'toggle' | 'button';
  onPress?: () => void;
  showChevron?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  type = 'toggle',
  onPress,
  showChevron = false,
}) => {
  const handleToggle = (newValue: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange?.(newValue);
  };

  const handlePress = () => {
    if (type === 'button' && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const Container = type === 'button' ? TouchableOpacity : View;

  return (
    <Container
      style={styles.container}
      onPress={handlePress}
      activeOpacity={type === 'button' ? 0.7 : 1}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={handleToggle}
          trackColor={{ false: colors.disabled, true: colors.primary }}
          thumbColor={colors.white}
          ios_backgroundColor={colors.disabled}
        />
      )}

      {type === 'button' && showChevron && (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
});
