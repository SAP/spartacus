import {
  NGRX_STORE,
  USER_ORDER_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
<<<<<<< HEAD
  AUTH_SERVICE,
  ROUTING_SERVICE
=======
  ROUTING_SERVICE,
  NGRX_STORE
>>>>>>> 518695c47 (Applied PR feedback/fixes for migration. (#9713).)
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDER_SERVICE_MIGRATION: ConstructorDeprecation = {
<<<<<<< HEAD
  //projects/core/src/user/facade/user-order.service.ts
=======
  // projects/core/src/user/facade/user-order.service.ts
>>>>>>> 518695c47 (Applied PR feedback/fixes for migration. (#9713).)
  class: USER_ORDER_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
<<<<<<< HEAD
    },
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
=======
>>>>>>> 518695c47 (Applied PR feedback/fixes for migration. (#9713).)
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
