import {
  PRODUCT_CAROUSEL_SERVICE,
  PRODUCT_REFERENCE_SERVICE,
  PRODUCT_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_CAROUSEL_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/product/carousel/product-carousel.service.ts
  class: PRODUCT_CAROUSEL_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PRODUCT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: PRODUCT_REFERENCE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: SEMANTIC_PATH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: PRODUCT_REFERENCE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
