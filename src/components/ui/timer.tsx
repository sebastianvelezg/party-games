import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../config/theme';

interface TimerProps {
  duration: number; // Duration in seconds
  onComplete?: () => void;
  autoStart?: boolean;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  duration,
  onComplete,
  autoStart = false,
  isPaused = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      setIsRunning(false);
    }
  }, [isPaused]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 50) return colors.success;
    if (percentage > 20) return colors.warning;
    return colors.error;
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerCircle}>
        <View
          style={[
            styles.progressCircle,
            {
              backgroundColor: getTimerColor(),
              opacity: 0.2,
            },
          ]}
        />
        <View style={styles.content}>
          <Ionicons name="time" size={24} color={getTimerColor()} />
          <Text style={[styles.time, { color: getTimerColor() }]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: getTimerColor(),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  progressCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.xs,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.disabled,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
});
