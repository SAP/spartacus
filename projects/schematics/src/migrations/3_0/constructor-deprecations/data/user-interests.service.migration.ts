import {
  AUTH_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
  USER_INTERESTS_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_INTERESTS_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/user-interests.service.ts
  class: USER_INTERESTS_SERVICE,
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
