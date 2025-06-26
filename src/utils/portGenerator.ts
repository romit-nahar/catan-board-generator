import type { Port, PortType } from '../types/board';

// Port distributions for different board sizes
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

// Port icons
export const PORT_ICONS: Record<PortType, string> = {
  forest: '🌲',
  pasture: '🐑',
  fields: '🌾',
  hills: '🧱',
  mountains: '⛰️',
  generic: '⚓'
};

// Port colors
export const PORT_COLORS: Record<PortType, string> = {
  forest: '#4CAF50',
  pasture: '#8BC34A',
  fields: '#FFEB3B',
  hills: '#FF9800',
  mountains: '#9E9E9E',
  generic: '#2196F3'
};

// Get water hex positions around the board
function getWaterHexPositions(size: '3-4' | '5-6'): Array<{ q: number; r: number }> {
  const positions: Array<{ q: number; r: number }> = [];
  
  if (size === '3-4') {
    // Water hexes around 3-4 player board (3 rings)
    for (let q = -3; q <= 3; q++) {
      for (let r = -3; r <= 3; r++) {
        const s = -q - r;
        // Only include positions that are outside the main board (distance > 2)
        if (Math.abs(q) > 2 || Math.abs(r) > 2 || Math.abs(s) > 2) {
          // But not too far out (distance <= 3)
          if (Math.abs(q) <= 3 && Math.abs(r) <= 3 && Math.abs(s) <= 3) {
            positions.push({ q, r });
          }
        }
      }
    }
  } else {
    // Water hexes around 5-6 player board (4 rings)
    for (let q = -4; q <= 4; q++) {
      for (let r = -4; r <= 4; r++) {
        const s = -q - r;
        // Only include positions that are outside the main board (distance > 3)
        if (Math.abs(q) > 3 || Math.abs(r) > 3 || Math.abs(s) > 3) {
          // But not too far out (distance <= 4)
          if (Math.abs(q) <= 4 && Math.abs(r) <= 4 && Math.abs(s) <= 4) {
            positions.push({ q, r });
          }
        }
      }
    }
  }
  
  return positions;
}

// Generate water hexes for empty spaces to maintain hexagonal shape
export function generateWaterHexes(size: '3-4' | '5-6'): Array<{ q: number; r: number }> {
  const waterHexes: Array<{ q: number; r: number }> = [];
  
  if (size === '3-4') {
    // Fill in water hexes in a 3-ring pattern around the board
    for (let q = -3; q <= 3; q++) {
      for (let r = -3; r <= 3; r++) {
        const s = -q - r;
        // Only include positions that are outside the main board (distance > 2)
        if (Math.abs(q) > 2 || Math.abs(r) > 2 || Math.abs(s) > 2) {
          // But not too far out (distance <= 3)
          if (Math.abs(q) <= 3 && Math.abs(r) <= 3 && Math.abs(s) <= 3) {
            waterHexes.push({ q, r });
          }
        }
      }
    }
  } else {
    // Fill in water hexes in a 4-ring pattern around the board
    for (let q = -4; q <= 4; q++) {
      for (let r = -4; r <= 4; r++) {
        const s = -q - r;
        // Only include positions that are outside the main board (distance > 3)
        if (Math.abs(q) > 3 || Math.abs(r) > 3 || Math.abs(s) > 3) {
          // But not too far out (distance <= 4)
          if (Math.abs(q) <= 4 && Math.abs(r) <= 4 && Math.abs(s) <= 4) {
            waterHexes.push({ q, r });
          }
        }
      }
    }
  }
  
  return waterHexes;
}

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePorts(size: '3-4' | '5-6'): Port[] {
  const distribution = PORT_DISTRIBUTIONS[size];
  const portTypes: PortType[] = [];
  
  // Create array of port types based on distribution
  Object.entries(distribution).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      portTypes.push(type as PortType);
    }
  });
  
  // Shuffle port types
  const shuffledTypes = shuffleArray(portTypes);
  
  // Get water hex positions
  const waterPositions = getWaterHexPositions(size);
  
  // Select random water positions for ports
  const selectedPositions = shuffleArray(waterPositions).slice(0, shuffledTypes.length);
  
  // Create port objects (edge is not needed anymore since ports are on their own hexes)
  const ports: Port[] = selectedPositions.map((pos, index) => ({
    id: `port-${pos.q}-${pos.r}`,
    type: shuffledTypes[index],
    position: { q: pos.q, r: pos.r },
    edge: 0 // Not used anymore
  }));
  
  return ports;
} 