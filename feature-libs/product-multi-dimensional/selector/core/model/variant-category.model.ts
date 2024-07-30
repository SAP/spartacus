import { Image } from '@spartacus/core';

export type VariantCategoryOption = {
  value: string;
  code: string;
  images: Image[];
};

export type VariantCategoryGroup = {
  name: string;
  variantOptions: VariantCategoryOption[];
  hasImages: boolean;
};
