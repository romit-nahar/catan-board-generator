export type ResourceType = 'forest' | 'pasture' | 'fields' | 'hills' | 'mountains' | 'desert';

export type PortType = 'forest' | 'pasture' | 'fields' | 'hills' | 'mountains' | 'generic';

export interface Port {
  id: string;
  type: PortType;
  position: {
    q: number;
    r: number;
  };
  edge: number; // 0-5, which edge of the hex the port is on
}

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
  ports: Port[];
  waterHexes: Array<{ q: number; r: number }>;
  resourceCounts: Record<string, number>;
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