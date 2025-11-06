import { GameCard } from "@/src/components/ui/game-card";
import { getAllGames } from "@/src/config/games";
import { colors, effects, layout, typography } from "@/src/config/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const games = getAllGames();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      {/* Enhanced gradient header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark, "#2E1065"]}
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
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.title}>Party Games</Text>
            <View style={styles.emojiRow}>
              <Text style={styles.emoji}>🎮</Text>
              <Text style={styles.emoji}>🎯</Text>
              <Text style={styles.emoji}>🎲</Text>
            </View>
          </View>

          <View style={styles.subtitleContainer}>
            <View style={styles.accentDot} />
            <Text style={styles.subtitle}>Select a game to begin</Text>
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
            transform: [{ translateY: Animated.multiply(slideAnim, 2) }],
          }}
        >
          {games.length > 0 && (
            <View style={styles.gamesGrid}>
              {games.map((game, index) => (
                <Animated.View
                  key={game.id}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: Animated.multiply(
                          slideAnim,
                          new Animated.Value(1 + index * 0.5)
                        ),
                      },
                    ],
                  }}
                >
                  <GameCard
                    game={game}
                    onPress={() => router.push(game.route as any)}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {games.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>🎯</Text>
              </View>
              <Text style={styles.emptyText}>No games available yet</Text>
              <Text style={styles.emptySubtext}>
                Stay tuned for exciting new games!
              </Text>
              <View style={styles.emptyDecoration} />
            </View>
          )}
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
    shadowColor: colors.primary,
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
    marginBottom: layout.spacing["6"],
  },
  welcomeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.textMuted,
    letterSpacing: typography.letterSpacing.wider,
    marginBottom: layout.spacing["1"],
    textTransform: "uppercase",
  },
  title: {
    fontSize: typography.fontSize["5xl"],
    fontWeight: typography.fontWeight.black,
    color: colors.text,
    letterSpacing: typography.letterSpacing.tight,
    textShadowColor: "rgba(139, 92, 246, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  emojiRow: {
    flexDirection: "row",
    gap: layout.spacing["3"],
    marginTop: layout.spacing["3"],
  },
  emoji: {
    fontSize: typography.fontSize["3xl"],
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
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: layout.spacing["5"],
    paddingHorizontal: layout.spacing["5"],
    paddingBottom: layout.spacing["10"],
  },
  gamesGrid: {
    gap: layout.spacing["4"],
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: layout.spacing["20"],
    paddingHorizontal: layout.spacing["10"],
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: layout.borderRadius.full,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: layout.spacing["6"],
    ...effects.shadows.lg,
    shadowColor: colors.primary,
  },
  emptyIcon: {
    fontSize: typography.fontSize["6xl"],
  },
  emptyText: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing["2"],
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: typography.fontSize.base,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  emptyDecoration: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.full,
    marginTop: layout.spacing["6"],
    opacity: effects.opacity["50"],
  },
});
