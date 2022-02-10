import {
  ANGULAR_ROUTER,
  ORDER_RETURN_GUARD,
  ORDER_RETURN_SERVICE,
  ROUTER,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_RETURN_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/order/amend-order/returns/order-return.guard.ts
  class: ORDER_RETURN_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ORDER_RETURN_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: SEMANTIC_PATH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
};
