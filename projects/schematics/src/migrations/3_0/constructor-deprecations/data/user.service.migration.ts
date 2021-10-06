import {
  USER_SERVICE,
  SPARTACUS_CORE,
  STORE,
  AUTH_SERVICE,
  USER_ID_SERVICE,
  NGRX_STORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/user.service.ts
  class: USER_SERVICE,
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
