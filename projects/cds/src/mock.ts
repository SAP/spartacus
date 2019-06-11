import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const mockComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  MerchandisingCarouselComponent: {
    typeCode: 'MerchandisingCarouselComponent',
    flexType: 'MerchandisingCarouselComponent',
    title: 'Mock Merch Component',
    strategy: '004821e5-1112-4e7c-9994-25364e06171c',
  },
};

export const mockSlotConfig: CmsPageSlotsConfig = {
  mock: {
    componentIds: ['MerchandisingCarouselComponent'],
  },
};
