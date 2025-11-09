import { useEffect, useState } from 'react';
import type { NokiaAppProps } from '../../types/app.types';
import { useSnakeGame } from './useSnakeGame';
import type { Position } from './snakeTypes';
import { loadState, saveState } from '../../core/storage';

export const SnakeApp: React.FC<NokiaAppProps> = ({
  onKey,
  setSoftkeys,
  goBack,
}) => {
  const { gameState, resetGame, togglePause, changeDirection } = useSnakeGame();
  const [highScore, setHighScore] = useState<number>(() => {
    return loadState('snake.highScore', 0);
  });

  // Update high score when game ends
  useEffect(() => {
    if (gameState.gameStatus === 'gameOver' && gameState.score > highScore) {
      setHighScore(gameState.score);
      saveState('snake.highScore', gameState.score);
    }
  }, [gameState.gameStatus, gameState.score, highScore]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: string) => {
      if (gameState.gameStatus === 'gameOver') {
        // Handle game over screen keys
        switch (action) {
          case 'SOFT_LEFT':
            resetGame();
            break;
          case 'SOFT_RIGHT':
            goBack();
            break;
        }
        return;
      }

      switch (action) {
        case 'UP':
          changeDirection('UP');
          break;
        case 'DOWN':
          changeDirection('DOWN');
          break;
        case 'LEFT':
          changeDirection('LEFT');
          break;
        case 'RIGHT':
          changeDirection('RIGHT');
          break;
        case 'SOFT_LEFT':
          togglePause();
          break;
        case 'SOFT_RIGHT':
          goBack();
          break;
      }
    };

    onKey(handleKey as any);
  }, [onKey, changeDirection, togglePause, goBack, gameState.gameStatus, resetGame]);

  // Set softkeys based on game status
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      setSoftkeys('Pause', 'Exit');
    } else if (gameState.gameStatus === 'paused') {
      setSoftkeys('Resume', 'Exit');
    } else if (gameState.gameStatus === 'gameOver') {
      setSoftkeys('Retry', 'Exit');
    }
  }, [gameState.gameStatus, setSoftkeys]);

  const isCellSnake = (x: number, y: number): boolean => {
    return gameState.snake.some(
      (segment: Position) => segment.x === x && segment.y === y
    );
  };

  const isCellFood = (x: number, y: number): boolean => {
    return gameState.food.x === x && gameState.food.y === y;
  };

  if (gameState.gameStatus === 'gameOver') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="text-lg mb-4">GAME OVER</div>
        <div className="text-sm mb-2">Score: {gameState.score}</div>
        <div className="text-sm mb-4">High Score: {highScore}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-1">
      {/* Score display */}
      <div className="text-xs mb-1">Score: {gameState.score}</div>

      {/* Game grid */}
      <div
        className="grid gap-0 border border-current"
        style={{
          gridTemplateColumns: `repeat(${gameState.gridWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gameState.gridHeight}, 1fr)`,
          aspectRatio: `${gameState.gridWidth} / ${gameState.gridHeight}`,
        }}
      >
        {Array.from({ length: gameState.gridHeight }).map((_, y) =>
          Array.from({ length: gameState.gridWidth }).map((_, x) => {
            const isSnake = isCellSnake(x, y);
            const isFood = isCellFood(x, y);

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  ${isSnake ? 'bg-current' : ''}
                  ${isFood ? 'bg-current opacity-50' : ''}
                `}
                style={{
                  aspectRatio: '1',
                }}
              />
            );
          })
        )}
      </div>

      {/* Pause overlay */}
      {gameState.gameStatus === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm">PAUSED</div>
        </div>
      )}
    </div>
  );
};
