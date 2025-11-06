import { Game } from '../types';
import { colors } from './theme';

/**
 * Game Registry
 *
 * This is the central place to register all available games in the app.
 * To add a new game:
 * 1. Create your game folder in src/games/
 * 2. Add a new entry to this array with game metadata
 * 3. Create the corresponding screen in app/ directory
 */

export const GAMES: Game[] = [
  {
    id: 'impostor',
    name: 'The Impostor',
    description: 'Find who doesn\'t know the secret word',
    minPlayers: 3,
    maxPlayers: 12,
    icon: 'eye-off',
    color: colors.gameColors.purple,
    route: '/games/impostor',
  },
  // Add more games here as they are developed
  // Example:
  // {
  //   id: 'truth-or-dare',
  //   name: 'Truth or Dare',
  //   description: 'Classic party game with a twist',
  //   minPlayers: 2,
  //   maxPlayers: 10,
  //   icon: 'help-circle',
  //   color: colors.gameColors.pink,
  //   route: '/games/truth-or-dare',
  // },
];

/**
 * Get a game by its ID
 */
export const getGameById = (id: string): Game | undefined => {
  return GAMES.find((game) => game.id === id);
};

/**
 * Get all available games
 */
export const getAllGames = (): Game[] => {
  return GAMES;
};

/**
 * Get games by player count
 */
export const getGamesByPlayerCount = (playerCount: number): Game[] => {
  return GAMES.filter(
    (game) => playerCount >= game.minPlayers && playerCount <= game.maxPlayers
  );
};
