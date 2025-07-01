import React from 'react';
import { PORT_ICONS } from '../utils/portGenerator';
import './BoardControls.css';

interface BoardControlsProps {
  boardSize: '3-4' | '5-6';
  onBoardSizeChange: (size: '3-4' | '5-6') => void;
  onGenerateNewBoard: () => void;
  portMode: 'default' | 'random';
  onPortModeChange: (mode: 'default' | 'random') => void;
}

// Fixed resource distributions for each board size
const RESOURCE_DISTRIBUTIONS = {
  '3-4': {
    forest: 4,
    pasture: 4,
    fields: 4,
    hills: 3,
    mountains: 3,
    desert: 1
  },
  '5-6': {
    forest: 5,
    pasture: 5,
    fields: 5,
    hills: 4,
    mountains: 4,
    desert: 1
  }
};

// Fixed port distributions for each board size
const PORT_DISTRIBUTIONS = {
  '3-4': {
    forest: 1,
    pasture: 1,
    fields: 1,
    hills: 1,
    mountains: 1,
    generic: 4
  },
  '5-6': {
    forest: 1,
    pasture: 1,
    fields: 1,
    hills: 1,
    mountains: 1,
    generic: 7
  }
};

export const BoardControls: React.FC<BoardControlsProps> = React.memo(({
  boardSize,
  onBoardSizeChange,
  onGenerateNewBoard,
  portMode,
  onPortModeChange
}) => {
  const resourceCounts = RESOURCE_DISTRIBUTIONS[boardSize];
  const portCounts = PORT_DISTRIBUTIONS[boardSize];
  const totalPorts = Object.values(portCounts).reduce((sum, count) => sum + count, 0);

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
        <div className="size-selector">
          <label htmlFor="port-mode">Port Placement:</label>
          <select
            id="port-mode"
            value={portMode}
            onChange={e => onPortModeChange(e.target.value as 'default' | 'random')}
            className="size-select"
          >
            <option value="default">Default (Official)</option>
            <option value="random">Random</option>
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
          {Object.entries(resourceCounts).map(([resource, count]) => (
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
        
        <h3>Ports ({totalPorts}):</h3>
        <div className="stats-grid">
          {Object.entries(portCounts).map(([portType, count]) => (
            <div key={portType} className="stat-item">
              <span className="resource-icon">
                {PORT_ICONS[portType as keyof typeof PORT_ICONS]}
              </span>
              <span className="resource-name">{portType}</span>
              <span className="resource-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}); 