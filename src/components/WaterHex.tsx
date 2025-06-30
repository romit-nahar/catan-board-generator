import React from 'react';
import { hexToPixel } from '../utils/hexLayout';
import './WaterHex.css';

interface WaterHexProps {
  position: { q: number; r: number };
  hexSize?: number;
}

export const WaterHex: React.FC<WaterHexProps> = ({ position, hexSize = 80 }) => {
  const { x, y } = hexToPixel(position.q, position.r, hexSize);
  const gradientId = `waterGradient-${position.q}-${position.r}`;
  
  // Create a full hex for the water
  const waterHexPath = `M 0 -${hexSize} L ${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} L ${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L 0 ${hexSize} L -${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L -${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} Z`;
  
  return (
    <g className="water-hex" transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Water gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1976d2', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#2196f3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1976d2', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>
      
      {/* Water hex background */}
      <path
        d={waterHexPath}
        fill={`url(#${gradientId})`}
        stroke="#1565c0"
        strokeWidth="3"
        className="water-hex-path"
      />
    </g>
  );
}; 