export interface ImpostorPlayer {
  id: string;
  name: string;
  isImpostor: boolean;
  word: string | null;
  hasRevealed: boolean;
}

export interface ImpostorGameState {
  players: ImpostorPlayer[];
  categoryId: string;
  categoryName: string;
  secretWord: string;
  impostorCount: number;
  currentPlayerIndex: number;
  gameStarted: boolean;
  gameEnded: boolean;
  isCustomCategory: boolean;
  customWords?: string[];
}
