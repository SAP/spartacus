import {
  USER_PAYMENT_SERVICE,
  SPARTACUS_CORE,
  STORE,
  AUTH_SERVICE,
  USER_ID_SERVICE,
  NGRX_STORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_PAYMENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/user-payment.service.ts
  class: USER_PAYMENT_SERVICE,
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
