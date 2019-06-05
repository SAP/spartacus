import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const defaultPdpComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  CMSProductImages: {
    typeCode: 'CMSProductImages',
    flexType: 'CMSProductImages',
    uid: 'CMSProductImages',
  },
  CMSProductSummary: {
    typeCode: 'CMSProductSummary',
    flexType: 'CMSProductSummary',
    uid: 'CMSProductSummary',
  },
};

export const defaultPdpSlots: CmsPageSlotsConfig = {
  ProductDetails: {
    componentIds: ['CMSProductImages', 'CMSProductSummary'],
  },
};
