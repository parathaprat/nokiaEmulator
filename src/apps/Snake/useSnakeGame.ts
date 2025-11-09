import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  SnakeGameState,
  Position,
  Direction,
} from './snakeTypes';
import { GRID_WIDTH, GRID_HEIGHT } from './snakeTypes';

const GAME_SPEED = 200; // milliseconds per move

const getRandomPosition = (snake: Position[]): Position => {
  let position: Position;
  let isValid = false;

  while (!isValid) {
    position = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    };

    // Check if position overlaps with snake
    isValid = !snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }

  return position!;
};

const getInitialState = (): SnakeGameState => {
  const initialSnake = [
    { x: 14, y: 8 },
    { x: 13, y: 8 },
    { x: 12, y: 8 },
  ];

  return {
    snake: initialSnake,
    direction: 'RIGHT',
    food: getRandomPosition(initialSnake),
    score: 0,
    gameStatus: 'playing',
    gridWidth: GRID_WIDTH,
    gridHeight: GRID_HEIGHT,
  };
};

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<SnakeGameState>(getInitialState());
  const gameLoopRef = useRef<number | null>(null);
  const nextDirectionRef = useRef<Direction>(gameState.direction);

  const resetGame = useCallback(() => {
    setGameState(getInitialState());
    nextDirectionRef.current = 'RIGHT';
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing',
    }));
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prev) => {
      const currentDirection = prev.direction;

      // Prevent reversing direction
      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[currentDirection] === newDirection) {
        return prev;
      }

      nextDirectionRef.current = newDirection;
      return prev;
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    gameLoopRef.current = window.setInterval(() => {
      setGameState((prev) => {
        if (prev.gameStatus !== 'playing') {
          return prev;
        }

        // Update direction from ref
        const direction = nextDirectionRef.current;
        const head = prev.snake[0];

        // Calculate new head position
        let newHead: Position;
        switch (direction) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_WIDTH ||
          newHead.y < 0 ||
          newHead.y >= GRID_HEIGHT
        ) {
          return { ...prev, gameStatus: 'gameOver' };
        }

        // Check self collision
        if (
          prev.snake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          return { ...prev, gameStatus: 'gameOver' };
        }

        // Check food consumption
        const ateFood = newHead.x === prev.food.x && newHead.y === prev.food.y;

        let newSnake: Position[];
        let newFood = prev.food;
        let newScore = prev.score;

        if (ateFood) {
          // Grow snake (don't remove tail)
          newSnake = [newHead, ...prev.snake];
          newFood = getRandomPosition(newSnake);
          newScore = prev.score + 1;
        } else {
          // Move snake (remove tail)
          newSnake = [newHead, ...prev.snake.slice(0, -1)];
        }

        return {
          ...prev,
          snake: newSnake,
          direction,
          food: newFood,
          score: newScore,
        };
      });
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus]);

  return {
    gameState,
    resetGame,
    togglePause,
    changeDirection,
  };
};
