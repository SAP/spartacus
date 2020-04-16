import {
  ANGULAR_HTTP,
  CONVERTER_SERVICE,
  FEATURE_CONFIG_SERVICE,
  HTTP_CLIENT,
  OCC_CART_ENTRY_ADAPTER,
  OCC_ENDPOINTS_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OCC_CART_ENTRY_ADAPTER_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/occ/adapters/cart/occ-cart-entry.adapter.ts
  class: OCC_CART_ENTRY_ADAPTER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: HTTP_CLIENT, importPath: ANGULAR_HTTP },
    { className: OCC_ENDPOINTS_SERVICE, importPath: SPARTACUS_CORE },
    { className: CONVERTER_SERVICE, importPath: SPARTACUS_CORE },
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
