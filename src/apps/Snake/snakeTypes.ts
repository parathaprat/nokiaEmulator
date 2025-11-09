export interface Position {
  x: number;
  y: number;
}

export type GameStatus = 'playing' | 'paused' | 'gameOver';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const GRID_WIDTH = 28;
export const GRID_HEIGHT = 16;

export interface SnakeGameState {
  snake: Position[]; // Head at index 0
  direction: Direction;
  food: Position;
  score: number;
  gameStatus: GameStatus;
  gridWidth: number;
  gridHeight: number;
}
