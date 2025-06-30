import React, { useEffect, useState } from 'react';
import type { BoardConfig } from '../types/board';
import { generateBoard } from '../utils/boardGenerator';
import { BoardControls } from './BoardControls';
import './BoardGenerator.css';
import { HexGrid } from './HexGrid';

export const BoardGenerator: React.FC = () => {
  const [boardSize, setBoardSize] = useState<'3-4' | '5-6'>('3-4');
  const [board, setBoard] = useState<BoardConfig>(() => generateBoard('3-4'));
  const [useVideos, setUseVideos] = useState(false);
  const [useImages, setUseImages] = useState(false);

  const generateNewBoard = () => {
    setBoard(generateBoard(boardSize));
  };

  const handleBoardSizeChange = (size: '3-4' | '5-6') => {
    setBoardSize(size);
    setBoard(generateBoard(size));
  };

  const handleToggleVideos = () => {
    setUseVideos(!useVideos);
  };

  const handleToggleImages = () => {
    setUseImages(!useImages);
  };

  // Generate new board on component mount
  useEffect(() => {
    generateNewBoard();
  }, []);

  return (
    <div className="board-generator">
      <BoardControls
        boardSize={boardSize}
        onBoardSizeChange={handleBoardSizeChange}
        onGenerateNewBoard={generateNewBoard}
        useVideos={useVideos}
        onToggleVideos={handleToggleVideos}
        useImages={useImages}
        onToggleImages={handleToggleImages}
      />
      <HexGrid board={board} useVideos={useVideos} useImages={useImages} />
    </div>
  );
}; 