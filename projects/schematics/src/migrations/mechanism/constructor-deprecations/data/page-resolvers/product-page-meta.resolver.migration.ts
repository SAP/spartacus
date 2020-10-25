import {
  FEATURE_CONFIG_SERVICE,
  PRODUCT_PAGE_META_RESOLVER,
  PRODUCT_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../../shared/utils/file-utils';

export const PRODUCT_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: PRODUCT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: PRODUCT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
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
