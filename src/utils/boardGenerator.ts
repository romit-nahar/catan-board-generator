import type { BoardConfig, HexTile } from '../types/board';
import { generateHexPositions } from './hexLayout';
import { generatePorts, generateWaterHexes } from './portGenerator';
import { createNumberArray, createResourceArray } from './resourceDistribution';

// Check if any more than 2 hexes of the same resource type are connected in any form
function hasConnectedSameResource(hexes: HexTile[]): boolean {
  // Get all hex positions for quick lookup
  const hexMap = new Map<string, string>();
  hexes.forEach(hex => {
    const key = `${hex.position.q},${hex.position.r}`;
    hexMap.set(key, hex.resource);
  });

  // Group hexes by resource type
  const resourceGroups = new Map<string, Array<{ q: number; r: number }>>();
  hexes.forEach(hex => {
    if (!resourceGroups.has(hex.resource)) {
      resourceGroups.set(hex.resource, []);
    }
    resourceGroups.get(hex.resource)!.push(hex.position);
  });

  // Check each resource type for connected components
  for (const [resource, positions] of resourceGroups) {
    if (positions.length <= 2) continue; // Can't have more than 2 connected if only 2 exist
    
    // Find all connected components of this resource type
    const visited = new Set<string>();
    const components: Array<Array<{ q: number; r: number }>> = [];
    
    for (const position of positions) {
      const key = `${position.q},${position.r}`;
      if (visited.has(key)) continue;
      
      // Start a new connected component
      const component: Array<{ q: number; r: number }> = [];
      const queue: Array<{ q: number; r: number }> = [position];
      
      while (queue.length > 0) {
        const current = queue.shift()!;
        const currentKey = `${current.q},${current.r}`;
        
        if (visited.has(currentKey)) continue;
        visited.add(currentKey);
        component.push(current);
        
        // Check all 6 neighbors (pointy-topped hex directions)
        const neighbors = [
          { q: current.q + 1, r: current.r - 1 }, // top-right
          { q: current.q + 1, r: current.r },     // right
          { q: current.q, r: current.r + 1 },     // bottom-right
          { q: current.q - 1, r: current.r + 1 }, // bottom-left
          { q: current.q - 1, r: current.r },     // left
          { q: current.q, r: current.r - 1 },     // top-left
        ];
        
        for (const neighbor of neighbors) {
          const neighborKey = `${neighbor.q},${neighbor.r}`;
          const neighborResource = hexMap.get(neighborKey);
          if (neighborResource === resource && !visited.has(neighborKey)) {
            queue.push(neighbor);
          }
        }
      }
      
      if (component.length > 0) {
        components.push(component);
      }
    }
    
    // Check if any component has more than 2 hexes
    for (const component of components) {
      if (component.length > 2) {
        return true; // Found more than 2 connected hexes of the same resource
      }
    }
  }
  
  return false;
}

// Check if any 3 hexes of the same resource type are touching each other (triangle formation)
function hasTouchingTriangle(hexes: HexTile[]): boolean {
  // Get all hex positions for quick lookup
  const hexMap = new Map<string, string>();
  hexes.forEach(hex => {
    const key = `${hex.position.q},${hex.position.r}`;
    hexMap.set(key, hex.resource);
  });

  // Check each hex for touching neighbors of the same resource
  for (const hex of hexes) {
    const touchingSameResource: string[] = [];
    
    // Check all 6 neighbors (pointy-topped hex directions)
    const neighbors = [
      { q: hex.position.q + 1, r: hex.position.r - 1 }, // top-right
      { q: hex.position.q + 1, r: hex.position.r },     // right
      { q: hex.position.q, r: hex.position.r + 1 },     // bottom-right
      { q: hex.position.q - 1, r: hex.position.r + 1 }, // bottom-left
      { q: hex.position.q - 1, r: hex.position.r },     // left
      { q: hex.position.q, r: hex.position.r - 1 },     // top-left
    ];

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.q},${neighbor.r}`;
      const neighborResource = hexMap.get(neighborKey);
      if (neighborResource === hex.resource) {
        touchingSameResource.push(neighborKey);
      }
    }

    // If this hex has 2 or more neighbors of the same resource, check if they touch each other
    if (touchingSameResource.length >= 2) {
      // Check if any of the touching neighbors also touch each other
      for (let i = 0; i < touchingSameResource.length; i++) {
        for (let j = i + 1; j < touchingSameResource.length; j++) {
          const [q1, r1] = touchingSameResource[i].split(',').map(Number);
          const [q2, r2] = touchingSameResource[j].split(',').map(Number);
          
          // Check if these two neighbors are adjacent to each other
          const neighborNeighbors = [
            { q: q1 + 1, r: r1 - 1 }, { q: q1 + 1, r: r1 }, { q: q1, r: r1 + 1 },
            { q: q1 - 1, r: r1 + 1 }, { q: q1 - 1, r: r1 }, { q: q1, r: r1 - 1 }
          ];
          
          if (neighborNeighbors.some(n => n.q === q2 && n.r === r2)) {
            return true; // Found 3 touching hexes of the same resource
          }
        }
      }
    }
  }
  
  return false;
}

export function generateBoard(size: '3-4' | '5-6'): BoardConfig {
  let attempts = 0;
  const maxAttempts = 200; // Increased attempts for stricter rules
  
  while (attempts < maxAttempts) {
    const positions = generateHexPositions(size);
    const resources = createResourceArray(size);
    const numbers = createNumberArray(size);
    const ports = generatePorts(size);
    const waterHexes = generateWaterHexes(size);
    
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
    
    // Check if the board violates either resource distribution rule
    if (!hasConnectedSameResource(hexes) && !hasTouchingTriangle(hexes)) {
      // Count resources for stats
      const resourceCounts = hexes.reduce((counts, hex) => {
        counts[hex.resource] = (counts[hex.resource] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);
      
      return {
        size,
        hexes,
        ports,
        waterHexes,
        resourceCounts
      };
    }
    
    attempts++;
  }
  
  // If we couldn't generate a valid board after max attempts, return the last generated one
  // This ensures the app doesn't crash, but logs a warning
  console.warn(`Could not generate board without resource clustering after ${maxAttempts} attempts. Using last generated board.`);
  
  const positions = generateHexPositions(size);
  const resources = createResourceArray(size);
  const numbers = createNumberArray(size);
  const ports = generatePorts(size);
  const waterHexes = generateWaterHexes(size);
  
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
  
  const resourceCounts = hexes.reduce((counts, hex) => {
    counts[hex.resource] = (counts[hex.resource] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  return {
    size,
    hexes,
    ports,
    waterHexes,
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