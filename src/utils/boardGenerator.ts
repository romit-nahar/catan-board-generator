import type { BoardConfig, HexTile } from '../types/board';
import { generateHexPositions } from './hexLayout';
import { generatePorts } from './portGenerator';
import { createNumberArray, createResourceArray } from './resourceDistribution';

export function generateBoard(size: '3-4' | '5-6'): BoardConfig {
  const positions = generateHexPositions(size);
  const resources = createResourceArray(size);
  const numbers = createNumberArray(size);
  const ports = generatePorts(size);
  
  const hexes: HexTile[] = positions.map((position, index) => {
    const resource = resources[index] as HexTile['resource'];
    const hasRobber = resource === 'desert';
    const number = resource === 'desert' ? undefined : numbers.shift();
    
    return {
      id: `hex-${position.q}-${position.r}`,
      resource,
      number,
      hasRobber,
      position
    };
  });
  
  // Count resources for stats
  const resourceCounts = hexes.reduce((counts, hex) => {
    counts[hex.resource] = (counts[hex.resource] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  return {
    size,
    hexes,
    ports,
    resourceCounts
  };
}

export function getSnakePattern(size: '3-4' | '5-6'): Array<{ q: number; r: number }> {
  // This is a simplified snake pattern - in real Catan it's more complex
  // but this gives us a good starting point for number placement
  const positions = generateHexPositions(size);
  
  // Sort positions to create a rough snake pattern
  return positions.sort((a, b) => {
    const distA = Math.abs(a.q) + Math.abs(a.r);
    const distB = Math.abs(b.q) + Math.abs(b.r);
    if (distA !== distB) return distA - distB;
    return a.q - b.q;
  });
} 