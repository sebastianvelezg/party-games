import { ImpostorPlayer, ImpostorGameState } from './types';
import { getRandomWord, getCategoryById } from './categories';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Creates player objects from names
 */
export const createPlayers = (playerNames: string[]): ImpostorPlayer[] => {
  return playerNames.map((name, index) => ({
    id: `player-${index}`,
    name,
    isImpostor: false,
    word: null,
    hasRevealed: false,
  }));
};

/**
 * Assigns impostors randomly to players
 */
export const assignImpostors = (
  players: ImpostorPlayer[],
  impostorCount: number
): ImpostorPlayer[] => {
  const shuffledPlayers = shuffleArray(players);

  return shuffledPlayers.map((player, index) => ({
    ...player,
    isImpostor: index < impostorCount,
  }));
};

/**
 * Distributes the secret word to non-impostor players
 */
export const distributeWords = (
  players: ImpostorPlayer[],
  secretWord: string
): ImpostorPlayer[] => {
  return players.map((player) => ({
    ...player,
    word: player.isImpostor ? null : secretWord,
  }));
};

/**
 * Initializes a new game with players, category, and impostor count
 */
export const initializeGame = (
  playerNames: string[],
  categoryId: string,
  impostorCount: number,
  isCustomCategory: boolean = false,
  customWords?: string[]
): ImpostorGameState | null => {
  // Validate inputs
  if (playerNames.length < 3) {
    return null;
  }

  if (impostorCount >= playerNames.length) {
    return null;
  }

  // Get secret word
  let secretWord: string | null;
  let categoryName: string;

  if (isCustomCategory && customWords && customWords.length > 0) {
    // Pick random word from custom words
    secretWord = customWords[Math.floor(Math.random() * customWords.length)];
    categoryName = 'Custom Category';
  } else {
    const category = getCategoryById(categoryId);
    if (!category) return null;

    secretWord = getRandomWord(categoryId);
    categoryName = category.name;
  }

  if (!secretWord) return null;

  // Create and setup players
  let players = createPlayers(playerNames);
  players = assignImpostors(players, impostorCount);
  players = distributeWords(players, secretWord);

  return {
    players,
    categoryId,
    categoryName,
    secretWord,
    impostorCount,
    currentPlayerIndex: 0,
    gameStarted: true,
    gameEnded: false,
    isCustomCategory,
    customWords,
  };
};

/**
 * Marks current player as having revealed their word
 */
export const revealCurrentPlayer = (state: ImpostorGameState): ImpostorGameState => {
  const updatedPlayers = state.players.map((player, index) =>
    index === state.currentPlayerIndex
      ? { ...player, hasRevealed: true }
      : player
  );

  return {
    ...state,
    players: updatedPlayers,
  };
};

/**
 * Moves to the next player
 */
export const nextPlayer = (state: ImpostorGameState): ImpostorGameState => {
  const nextIndex = state.currentPlayerIndex + 1;

  return {
    ...state,
    currentPlayerIndex: nextIndex,
  };
};

/**
 * Checks if all players have revealed their words
 */
export const allPlayersRevealed = (state: ImpostorGameState): boolean => {
  return state.players.every((player) => player.hasRevealed);
};

/**
 * Gets the current player
 */
export const getCurrentPlayer = (state: ImpostorGameState): ImpostorPlayer | null => {
  return state.players[state.currentPlayerIndex] || null;
};

/**
 * Gets impostor players
 */
export const getImpostors = (state: ImpostorGameState): ImpostorPlayer[] => {
  return state.players.filter((player) => player.isImpostor);
};

/**
 * Gets regular players (non-impostors)
 */
export const getRegularPlayers = (state: ImpostorGameState): ImpostorPlayer[] => {
  return state.players.filter((player) => !player.isImpostor);
};
