import React, { useEffect, useState } from 'react';
import type { BoardConfig } from '../types/board';
import { generateBoard } from '../utils/boardGenerator';
import { BoardControls } from './BoardControls';
import './BoardGenerator.css';
import { HexGrid } from './HexGrid';

export const BoardGenerator: React.FC = () => {
  const [boardSize, setBoardSize] = useState<'3-4' | '5-6'>('3-4');
  const [portMode, setPortMode] = useState<'default' | 'random'>('default');
  const [board, setBoard] = useState<BoardConfig>(() => generateBoard('3-4', 'default'));

  const generateNewBoard = () => {
    setBoard(generateBoard(boardSize, portMode));
  };

  const handleBoardSizeChange = (size: '3-4' | '5-6') => {
    setBoardSize(size);
    setBoard(generateBoard(size, portMode));
  };

  const handlePortModeChange = (mode: 'default' | 'random') => {
    setPortMode(mode);
    setBoard(generateBoard(boardSize, mode));
  };

  // Generate new board on component mount
  useEffect(() => {
    generateNewBoard();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="board-generator">
      <BoardControls
        boardSize={boardSize}
        onBoardSizeChange={handleBoardSizeChange}
        onGenerateNewBoard={generateNewBoard}
        portMode={portMode}
        onPortModeChange={handlePortModeChange}
      />
      <HexGrid board={board} />
    </div>
  );
}; 