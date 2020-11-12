import {
  AUTH_SERVICE,
  SPARTACUS_CORE,
  CHECKOUT_SERVICE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/checkout/facade/checkout.service.ts
  class: CHECKOUT_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
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
