import { ContentSlotComponentData } from '@spartacus/core';

export interface CarouselItem {
  title?: string;
  media?: { container: any; format?: string };
  price?: any;
  route?: any[];
  componentData?: ContentSlotComponentData;
}
