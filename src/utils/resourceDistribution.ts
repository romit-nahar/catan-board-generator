import type { NumberDistribution, ResourceDistribution } from '../types/board';

export const RESOURCE_DISTRIBUTIONS: Record<'3-4' | '5-6', ResourceDistribution> = {
  '3-4': {
    forest: 4,
    pasture: 4,
    fields: 4,
    hills: 3,
    mountains: 3,
    desert: 1
  },
  '5-6': {
    forest: 6,
    pasture: 6,
    fields: 6,
    hills: 5,
    mountains: 5,
    desert: 1
  }
};

export const NUMBER_DISTRIBUTIONS: Record<'3-4' | '5-6', NumberDistribution> = {
  '3-4': {
    2: 1, 3: 2, 4: 2, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 1
  },
  '5-6': {
    2: 1, 3: 2, 4: 2, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 1
  }
};

export function createResourceArray(size: '3-4' | '5-6'): string[] {
  const distribution = RESOURCE_DISTRIBUTIONS[size];
  const resources: string[] = [];
  
  Object.entries(distribution).forEach(([resource, count]) => {
    for (let i = 0; i < count; i++) {
      resources.push(resource);
    }
  });
  
  return shuffleArray(resources);
}

export function createNumberArray(size: '3-4' | '5-6'): number[] {
  const distribution = NUMBER_DISTRIBUTIONS[size];
  const numbers: number[] = [];
  
  Object.entries(distribution).forEach(([number, count]) => {
    for (let i = 0; i < count; i++) {
      numbers.push(parseInt(number));
    }
  });
  
  return shuffleArray(numbers);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 