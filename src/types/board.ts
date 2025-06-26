export type ResourceType = 'forest' | 'pasture' | 'fields' | 'hills' | 'mountains' | 'desert';

export interface HexTile {
  id: string;
  resource: ResourceType;
  number?: number;
  hasRobber: boolean;
  position: {
    q: number; // axial coordinates
    r: number;
  };
}

export interface BoardConfig {
  size: '3-4' | '5-6';
  hexes: HexTile[];
  resourceCounts: Record<ResourceType, number>;
}

export interface ResourceDistribution {
  forest: number;
  pasture: number;
  fields: number;
  hills: number;
  mountains: number;
  desert: number;
}

export interface NumberDistribution {
  [key: number]: number; // number -> count
} 