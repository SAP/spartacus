import {
  AUTH_REDIRECT_SERVICE,
  AUTH_STORAGE_SERVICE,
  CDC_AUTH_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  NGRX_STORE,
  SPARTACUS_CDC,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cdc/src/auth/facade/cdc-auth.service.ts
  class: CDC_AUTH_SERVICE,
  importPath: SPARTACUS_CDC,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: AUTH_STORAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_REDIRECT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
