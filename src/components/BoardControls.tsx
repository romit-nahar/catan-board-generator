import React from 'react';
import type { BoardConfig } from '../types/board';
import './BoardControls.css';

interface BoardControlsProps {
  boardSize: '3-4' | '5-6';
  onBoardSizeChange: (size: '3-4' | '5-6') => void;
  onGenerateNewBoard: () => void;
  board: BoardConfig;
}

export const BoardControls: React.FC<BoardControlsProps> = ({
  boardSize,
  onBoardSizeChange,
  onGenerateNewBoard,
  board
}) => {
  return (
    <div className="board-controls">
      <div className="controls-header">
        <h1>🏝️ Catan Board Generator</h1>
        <p>Generate random Catan boards with proper resource distribution!</p>
      </div>
      
      <div className="controls-content">
        <div className="size-selector">
          <label htmlFor="board-size">Board Size:</label>
          <select
            id="board-size"
            value={boardSize}
            onChange={(e) => onBoardSizeChange(e.target.value as '3-4' | '5-6')}
            className="size-select"
          >
            <option value="3-4">3-4 Players (19 hexes)</option>
            <option value="5-6">5-6 Players (37 hexes)</option>
          </select>
        </div>
        
        <button
          onClick={onGenerateNewBoard}
          className="generate-btn"
        >
          🎲 Generate New Board
        </button>
      </div>
      
      <div className="board-stats">
        <h3>Resource Distribution:</h3>
        <div className="stats-grid">
          {Object.entries(board.resourceCounts).map(([resource, count]) => (
            <div key={resource} className="stat-item">
              <span className="resource-icon">
                {resource === 'forest' && '🌲'}
                {resource === 'pasture' && '🐑'}
                {resource === 'fields' && '🌾'}
                {resource === 'hills' && '🧱'}
                {resource === 'mountains' && '⛰️'}
                {resource === 'desert' && '🏜️'}
              </span>
              <span className="resource-name">{resource}</span>
              <span className="resource-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 