import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import {
  ACTIVE_CART_SERVICE,
  EVENT_SERVICE,
  PRODUCT_ADAPTER,
  PRODUCT_SEARCH_CONNECTOR,
  QUICK_ORDER_SERVICE,
  SPARTACUS_CART_QUICK_ORDER_CORE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';

export const QUICK_ORDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/cart/quick-order/core/services/quick-order.service.ts
  class: QUICK_ORDER_SERVICE,
  importPath: SPARTACUS_CART_QUICK_ORDER_CORE,
  deprecatedParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: PRODUCT_ADAPTER,
      importPath: SPARTACUS_CORE,
    },
    {
      className: EVENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: PRODUCT_SEARCH_CONNECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: PRODUCT_ADAPTER,
      importPath: SPARTACUS_CORE,
    },
  ],
};
