import React from 'react';
import type { Port as PortType } from '../types/board';
import { hexToPixel } from '../utils/hexLayout';
import { PORT_COLORS, PORT_ICONS } from '../utils/portGenerator';
import './Port.css';

interface PortProps {
  port: PortType;
  hexSize?: number;
}

export const Port: React.FC<PortProps> = ({ port, hexSize = 80 }) => {
  const { x, y } = hexToPixel(port.position.q, port.position.r, hexSize);
  const icon = PORT_ICONS[port.type];
  const color = PORT_COLORS[port.type];
  
  // Create a full hex for the port (same size as regular hexes)
  const portHexPath = `M 0 -${hexSize} L ${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} L ${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L 0 ${hexSize} L -${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L -${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} Z`;
  
  return (
    <g className="port" transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Water gradient */}
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1976d2', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#2196f3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1976d2', stopOpacity: 0.8 }} />
        </linearGradient>
        
        {/* Port accent gradient */}
        <linearGradient id={`portAccent-${port.type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      {/* Water hex background */}
      <path
        d={portHexPath}
        fill="url(#waterGradient)"
        stroke="#1565c0"
        strokeWidth="3"
        className="port-hex"
      />
      
      {/* Port accent overlay */}
      <path
        d={portHexPath}
        fill={`url(#portAccent-${port.type})`}
        stroke="none"
        className="port-accent"
      />
      
      {/* Port icon */}
      <text
        x="0"
        y="-${hexSize * 0.2}"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={hexSize * 0.4}
        className="port-icon"
      >
        {icon}
      </text>
      
      {/* Port label */}
      <text
        x="0"
        y={hexSize * 0.3}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={hexSize * 0.2}
        fontWeight="bold"
        fill="#ffffff"
        className="port-label"
      >
        {port.type === 'generic' ? '3:1' : '2:1'}
      </text>
      
      {/* Port type name */}
      <text
        x="0"
        y={hexSize * 0.6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={hexSize * 0.15}
        fill="#ffffff"
        className="port-type"
      >
        {port.type}
      </text>
    </g>
  );
}; 