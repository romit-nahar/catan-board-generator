import React from 'react';
import { RESOURCE_IMAGES } from '../config/images';
import type { HexTile as HexTileType } from '../types/board';
import { hexToPixel } from '../utils/hexLayout';
import './HexTile.css';

interface HexTileProps {
  hex: HexTileType;
  size?: number;
}

const RESOURCE_COLORS = {
  forest: 'url(#forestGradient)',
  pasture: 'url(#pastureGradient)',
  fields: 'url(#fieldsGradient)',
  hills: 'url(#hillsGradient)',
  mountains: 'url(#mountainsGradient)',
  desert: 'url(#desertGradient)'
};

export const HexTile: React.FC<HexTileProps> = ({ hex, size = 80 }) => {
  const { x, y } = hexToPixel(hex.position.q, hex.position.r, size);
  const fillColor = RESOURCE_COLORS[hex.resource];
  const imageSrc = RESOURCE_IMAGES[hex.resource];
  
  // Manually define pointy-topped hex path
  const hexPath = `M 0 -${size} L ${size * Math.sqrt(3) / 2} -${size / 2} L ${size * Math.sqrt(3) / 2} ${size / 2} L 0 ${size} L -${size * Math.sqrt(3) / 2} ${size / 2} L -${size * Math.sqrt(3) / 2} -${size / 2} Z`;
  
  return (
    <g className="hex-tile" transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Forest gradient */}
        <linearGradient id="forestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2d5016', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#4a7c59', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2d5016', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Pasture gradient */}
        <linearGradient id="pastureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5d8c3e', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#7cb342', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#5d8c3e', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Fields gradient */}
        <linearGradient id="fieldsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Hills gradient */}
        <linearGradient id="hillsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8d6e63', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#a1887f', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8d6e63', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Mountains gradient */}
        <linearGradient id="mountainsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5d4037', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#8d6e63', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#5d4037', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Desert gradient */}
        <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d7ccc8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#ffcc02', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#d7ccc8', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Resource image patterns */}
        <pattern id={`${hex.resource}Pattern`} patternUnits="objectBoundingBox" width="1" height="1">
          <image href={imageSrc} width={size * Math.sqrt(3)} height={size * 2} preserveAspectRatio="xMidYMid slice" />
        </pattern>
      </defs>
      
      <path
        d={hexPath}
        fill={`url(#${hex.resource}Pattern)`}
        stroke="#2c3e50"
        strokeWidth="3"
        className="hex-shape"
        onError={() => {
          // Fallback to gradient if image fails to load
          const path = document.querySelector(`[data-hex-id="${hex.id}"]`) as SVGPathElement;
          if (path) {
            path.setAttribute('fill', fillColor);
          }
        }}
        data-hex-id={hex.id}
      />
      
      {/* Number Token - centered in the hex */}
      {hex.number && (
        <circle
          cx="0"
          cy="0"
          r={size * 0.2}
          fill="#f8f9fa"
          stroke="#2c3e50"
          strokeWidth="3"
          className="number-token"
        />
      )}
      
      {hex.number && (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.25}
          fontWeight="bold"
          fill="#2c3e50"
          className="number-text"
        >
          {hex.number}
        </text>
      )}
      
      {/* Robber - positioned at top of hex */}
      {hex.hasRobber && (
        <circle
          cx="0"
          cy={-size * 0.6}
          r={size * 0.12}
          fill="#2c3e50"
          stroke="#ecf0f1"
          strokeWidth="3"
          className="robber"
        />
      )}
    </g>
  );
}; 