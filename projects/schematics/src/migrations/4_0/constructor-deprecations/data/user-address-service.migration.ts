import {
  COMMAND_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_CONNECTOR,
  USER_ADDRESS_SERVICE,
  USER_ID_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ADDRESS_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/facade/user-address.service.ts
  class: USER_ADDRESS_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: STORE, importPath: NGRX_STORE },
    { className: USER_ID_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: USER_ADDRESS_CONNECTOR, importPath: SPARTACUS_CORE },
    { className: COMMAND_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
