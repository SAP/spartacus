import {
  CMS_COMPONENT_DATA_CLASS,
  FEATURE_CONFIG_SERVICE,
  PRODUCT_CAROUSEL_COMPONENT,
  PRODUCT_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_CAROUSEL_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: PRODUCT_CAROUSEL_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: PRODUCT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
