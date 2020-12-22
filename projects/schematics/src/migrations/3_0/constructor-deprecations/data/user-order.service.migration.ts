import {
  USER_ORDER_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
  AUTH_SERVICE,
  ROUTING_SERVICE,
  NGRX_STORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/user-order.service.ts
  class: USER_ORDER_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
