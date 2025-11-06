// Game related types
export interface Game {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  icon: string;
  color: string;
  route: string;
}

// Settings types
export interface AppSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  keepScreenAwake: boolean;
  theme: 'light' | 'dark' | 'auto';
  defaultTimerDuration: number;
}

// Game history types
export interface GameSession {
  id: string;
  gameId: string;
  gameName: string;
  players: string[];
  date: string;
  duration?: number;
}

// Player types
export interface Player {
  id: string;
  name: string;
}
