import { ProductMultiDimensionalConfig } from './product-multi-dimensional-config';
import { VariantQualifier } from '@spartacus/core';

export const defaultProductMultiDimensionalConfig: ProductMultiDimensionalConfig =
  {
    multiDimensional: {
      imageFormat: VariantQualifier.STYLE_SWATCH,
    },
  };
