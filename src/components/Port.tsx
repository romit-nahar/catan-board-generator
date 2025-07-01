import React from 'react';
import type { Port as PortType } from '../types/board';
import { hexToPixel } from '../utils/hexLayout';
import { PORT_ICONS } from '../utils/portGenerator';
import './Port.css';

interface PortProps {
  port: PortType;
  hexSize?: number;
}

export const Port: React.FC<PortProps> = ({ port, hexSize = 80 }) => {
  const { x, y } = hexToPixel(port.position.q, port.position.r, hexSize);
  const icon = PORT_ICONS[port.type];
  const portHexPath = `M 0 -${hexSize} L ${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} L ${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L 0 ${hexSize} L -${hexSize * Math.sqrt(3) / 2} ${hexSize / 2} L -${hexSize * Math.sqrt(3) / 2} -${hexSize / 2} Z`;

  return (
    <g className="port" transform={`translate(${x}, ${y})`}>
      {/* Port hex background */}
      <path
        d={portHexPath}
        fill="#e0e0e0"
        stroke="#1565c0"
        strokeWidth="3"
        className="port-hex"
      />
      {/* Port icon */}
      <text
        x="0"
        y="0"
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
        fill="#1565c0"
        className="port-label"
      >
        {port.type === 'generic' ? '3:1' : '2:1'}
      </text>
    </g>
  );
}; 