import React from 'react';
import { hexToPixel } from '../utils/hexLayout';
import './WaterHex.css';

interface WaterHexProps {
  position: { q: number; r: number };
  hexSize?: number;
}

export const WaterHex: React.FC<WaterHexProps> = ({ position, hexSize = 80 }) => {
  const { x, y } = hexToPixel(position.q, position.r, hexSize);
  const waterHexPath = `M 0 -${hexSize} L ${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} L ${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L 0 ${hexSize} L -${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L -${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} Z`;

  return (
    <g className="water-hex" transform={`translate(${x}, ${y})`}>
      <path
        d={waterHexPath}
        fill="#90caf9"
        stroke="#1565c0"
        strokeWidth="3"
        className="water-hex-shape"
      />
    </g>
  );
}; 