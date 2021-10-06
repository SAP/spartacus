import {
  CDC_AUTH_SERVICE,
  SPARTACUS_CDC,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CDC_AUTH_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CDC_AUTH_SERVICE,
    importPath: SPARTACUS_CDC,
    deprecatedNode: `authorizeWithCustomCdcFlow`,
    comment: `// ${TODO_SPARTACUS} 'authorizeWithCustomCdcFlow' method was renamed to 'loginWithCustomCdcFlow'.`,
  },
  {
    class: CDC_AUTH_SERVICE,
    importPath: SPARTACUS_CDC,
    deprecatedNode: `logout`,
    comment: `// ${TODO_SPARTACUS} 'logout' method override was removed. Now CDC hooks into logout process, by providing 'CdcLogoutGuard' as 'LogoutGuard'.`,
  },
];
