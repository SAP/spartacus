import {
  ANGULAR_HTTP,
  CONVERTER_SERVICE,
  FEATURE_CONFIG_SERVICE,
  HTTP_CLIENT,
  OCC_ENDPOINTS_SERVICE,
  OCC_USER_ORDER_ADAPTER,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const OCC_USER_ORDER_ADAPTER_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/occ/adapters/cart/occ-user-order.adapter.ts
  class: OCC_USER_ORDER_ADAPTER,
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
