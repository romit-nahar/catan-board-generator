import React from 'react';
import type { BoardConfig } from '../types/board';
import { getAllHexPixels } from '../utils/hexLayout';
import './HexGrid.css';
import { HexTile } from './HexTile';
import { Port } from './Port';
import { WaterHex } from './WaterHex';

interface HexGridProps {
  board: BoardConfig;
  hexSize?: number;
}

export const HexGrid: React.FC<HexGridProps> = ({ board, hexSize = 80 }) => {
  // Calculate bounding box for all hexes (main hexes, ports, and water hexes)
  const allPositions = [
    ...board.hexes.map(h => h.position),
    ...board.ports.map(p => p.position),
    ...board.waterHexes
  ];
  const pixels = getAllHexPixels(allPositions, hexSize);
  const margin = hexSize * 1.2;
  const minX = Math.min(...pixels.map((p: { x: number; y: number }) => p.x)) - margin;
  const maxX = Math.max(...pixels.map((p: { x: number; y: number }) => p.x)) + margin;
  const minY = Math.min(...pixels.map((p: { x: number; y: number }) => p.y)) - margin;
  const maxY = Math.max(...pixels.map((p: { x: number; y: number }) => p.y)) + margin;
  const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  return (
    <div className="hex-grid-container">
      <svg
        className="hex-grid"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid contain"
        width="100%"
        height="100%"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render water hexes (background only, no numbers or highlights) */}
        {board.waterHexes.map((position) => (
          <WaterHex key={`water-${position.q}-${position.r}`} position={position} hexSize={hexSize} />
        ))}

        {/* Render main hexes */}
        {board.hexes.map((hex) => (
          <HexTile key={hex.id} hex={hex} size={hexSize} />
        ))}

        {/* Render ports on top */}
        {board.ports.map((port) => (
          <Port key={port.id} port={port} hexSize={hexSize} />
        ))}
      </svg>
    </div>
  );
}; 