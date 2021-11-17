import {
  BREAKPOINT_SERVICE,
  CONFIG,
  MEDIA_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STOREFRONT_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const MEDIA_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: MEDIA_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STOREFRONT_CONFIG,
      literalInference: STOREFRONT_CONFIG,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: STOREFRONT_CONFIG,
      literalInference: STOREFRONT_CONFIG,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
};
