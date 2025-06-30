export function generateHexPositions(size: '3-4' | '5-6'): Array<{ q: number; r: number }> {
  const positions: Array<{ q: number; r: number }> = [];
  
  if (size === '3-4') {
    // Standard Catan board: 3 rings around center
    for (let q = -2; q <= 2; q++) {
      for (let r = -2; r <= 2; r++) {
        const s = -q - r;
        if (Math.abs(q) <= 2 && Math.abs(r) <= 2 && Math.abs(s) <= 2) {
          positions.push({ q, r });
        }
      }
    }
  } else {
    // Extended board: 4 rings around center
    for (let q = -3; q <= 3; q++) {
      for (let r = -3; r <= 3; r++) {
        const s = -q - r;
        if (Math.abs(q) <= 3 && Math.abs(r) <= 3 && Math.abs(s) <= 3) {
          positions.push({ q, r });
        }
      }
    }
  }
  
  return positions;
}

// Pointy-topped hex math - correct positioning for pointy-topped hexes
export function hexToPixel(q: number, r: number, size: number = 80): { x: number; y: number } {
  const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
  const y = size * (3 / 2 * r);
  return { x, y };
}

export function getHexCorners(centerX: number, centerY: number, size: number = 80): Array<{ x: number; y: number }> {
  const corners = [];
  // For pointy-topped hexes, start at the top point (0 degrees) and go clockwise
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // 0, 60, 120, 180, 240, 300 degrees
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    corners.push({ x, y });
  }
  return corners;
}

export function getHexPath(centerX: number, centerY: number, size: number = 80): string {
  const corners = getHexCorners(centerX, centerY, size);
  const path = corners.map((corner, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command} ${corner.x} ${corner.y}`;
  }).join(' ') + ' Z';
  return path;
}

// Utility to get all pixel positions for bounding box
export function getAllHexPixels(hexes: { q: number; r: number }[], size: number): { x: number; y: number }[] {
  return hexes.map(({ q, r }) => hexToPixel(q, r, size));
} 