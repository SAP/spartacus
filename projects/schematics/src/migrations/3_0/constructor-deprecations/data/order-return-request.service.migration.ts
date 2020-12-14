import {
  AUTH_SERVICE,
  NGRX_STORE,
  ORDER_RETURN_REQUEST_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_RETURN_REQUEST_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/order-return-request.service.ts
  class: ORDER_RETURN_REQUEST_SERVICE,
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
  ],
};
