import {
  UPDATE_EMAIL_COMPONENT_SERVICE,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  USER_EMAIL_FACADE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  GLOBAL_MESSAGE_SERVICE,
  AUTH_SERVICE,
  AUTH_REDIRECT_SERVICE,
  SPARTACUS_USER_PROFILE_ROOT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const UPDATE_EMAIL_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs\user\profile\components\update-email\update-email-component.service.ts
    class: UPDATE_EMAIL_COMPONENT_SERVICE,
    importPath: SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
      {
        className: USER_EMAIL_FACADE,
        importPath: SPARTACUS_USER_PROFILE_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: AUTH_REDIRECT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
