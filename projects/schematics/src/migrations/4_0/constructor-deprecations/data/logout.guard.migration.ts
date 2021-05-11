import {
  AUTH_REDIRECT_SERVICE,
  LOGOUT_GUARD,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGOUT_GUARD_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/user/logout/logout.guard.ts
  class: LOGOUT_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [{ className: AUTH_REDIRECT_SERVICE, importPath: SPARTACUS_CORE }],
};
