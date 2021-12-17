import {
  AUTH_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
  USER_NOTIFICATION_PREFERENCE_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_NOTIFICATION_PREFERENCE_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // projects/core/src/user/facade/user-notification-preference.service.ts
    class: USER_NOTIFICATION_PREFERENCE_SERVICE,
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
