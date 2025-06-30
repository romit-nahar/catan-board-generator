// Image configuration for resource images
// Using local images for GitHub Pages deployment

const IMAGE_BASE_URL = '/images/resources/';

export const RESOURCE_IMAGES = {
  desert: `${IMAGE_BASE_URL}desert.png`,
  fields: `${IMAGE_BASE_URL}fields.png`,
  forest: `${IMAGE_BASE_URL}forest.png`,
  hills: `${IMAGE_BASE_URL}hills.png`,
  mountains: `${IMAGE_BASE_URL}mountains.png`,
  pasture: `${IMAGE_BASE_URL}pasture.png`,
} as const;

export const PORT_IMAGES = {
  brick: `${IMAGE_BASE_URL}ports/brick.png`,
  lumber: `${IMAGE_BASE_URL}ports/lumber.png`,
  ore: `${IMAGE_BASE_URL}ports/ore.png`,
  grain: `${IMAGE_BASE_URL}ports/grain.png`,
  wool: `${IMAGE_BASE_URL}ports/wool.png`,
  generic: `${IMAGE_BASE_URL}ports/generic.png`,
} as const; 