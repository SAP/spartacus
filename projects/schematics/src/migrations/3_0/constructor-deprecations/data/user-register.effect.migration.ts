import {
  SPARTACUS_CORE,
  NGRX_STORE,
  AUTH_SERVICE,
  ACTIONS,
  USER_CONNECTOR,
  USER_REGISTER_EFFECT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_REGISTER_EFFECT_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/user/store/effects/user-register.effect.ts
  class: USER_REGISTER_EFFECT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: ACTIONS,
      importPath: NGRX_STORE,
    },
    {
      className: USER_CONNECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
