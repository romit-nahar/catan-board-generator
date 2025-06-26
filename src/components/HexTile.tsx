import React from 'react';
import type { HexTile as HexTileType } from '../types/board';
import { hexToPixel } from '../utils/hexLayout';
import './HexTile.css';

interface HexTileProps {
  hex: HexTileType;
  size?: number;
}

const RESOURCE_COLORS = {
  forest: '#4CAF50',
  pasture: '#8BC34A',
  fields: '#FFEB3B',
  hills: '#FF9800',
  mountains: '#9E9E9E',
  desert: '#FFC107'
};

const RESOURCE_ICONS = {
  forest: '🌲',
  pasture: '🐑',
  fields: '🌾',
  hills: '🧱',
  mountains: '⛰️',
  desert: '🏜️'
};

export const HexTile: React.FC<HexTileProps> = ({ hex, size = 80 }) => {
  const { x, y } = hexToPixel(hex.position.q, hex.position.r, size);
  const fillColor = RESOURCE_COLORS[hex.resource];
  const icon = RESOURCE_ICONS[hex.resource];
  
  // Manually define pointy-topped hex path
  const hexPath = `M 0 -${size} L ${size * Math.sqrt(3) / 2} -${size / 2} L ${size * Math.sqrt(3) / 2} ${size / 2} L 0 ${size} L -${size * Math.sqrt(3) / 2} ${size / 2} L -${size * Math.sqrt(3) / 2} -${size / 2} Z`;
  
  return (
    <g className="hex-tile" transform={`translate(${x}, ${y})`}>
      <path
        d={hexPath}
        fill={fillColor}
        stroke="#333"
        strokeWidth="4"
        className="hex-shape"
      />
      
      {/* Resource Icon */}
      <text
        x="0"
        y="0"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.4}
        className="resource-icon"
      >
        {icon}
      </text>
      
      {/* Number Token */}
      {hex.number && (
        <circle
          cx="0"
          cy={size * 0.6}
          r={size * 0.15}
          fill="#fff"
          stroke="#333"
          strokeWidth="2"
          className="number-token"
        />
      )}
      
      {hex.number && (
        <text
          x="0"
          y={size * 0.6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.25}
          fontWeight="bold"
          fill="#333"
          className="number-text"
        >
          {hex.number}
        </text>
      )}
      
      {/* Robber */}
      {hex.hasRobber && (
        <circle
          cx="0"
          cy={-size * 0.6}
          r={size * 0.12}
          fill="#333"
          stroke="#fff"
          strokeWidth="2"
          className="robber"
        />
      )}
    </g>
  );
}; 