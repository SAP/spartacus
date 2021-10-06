import {
  AUTH_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const AUTH_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `authorize`,
    comment: `// ${TODO_SPARTACUS} authorize method was renamed to 'loginWithCredentials' and returns Promise that will resolve when login procedure completes.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'getOccUserId',
    comment: `// ${TODO_SPARTACUS} method was moved from this service. 'UserIdService.getUserId' is the new replacement for this method.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'invokeWithUserId',
    comment: `// ${TODO_SPARTACUS} method was moved to 'UserIdService'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'getUserToken',
    comment: `// ${TODO_SPARTACUS} this method was removed as it should not be used outside auth module. To check if user is logged in use 'isUserLoggedIn' and to get user id use 'UserIdService.getUserId'. If you need access to tokens then use 'AuthStorageService.getToken'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'refreshUserToken',
    comment: `// ${TODO_SPARTACUS} this method was moved and renamed to 'OAuthLibWrapperService.refreshToken'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'authorizeWithToken',
    comment: `// ${TODO_SPARTACUS} this method was removed. Instead you can create object of the shape 'AuthToken' and pass to 'AuthStorageService.setToken'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'getClientToken',
    comment: `// ${TODO_SPARTACUS} this method was moved to 'ClientTokenService'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'refreshClientToken',
    comment: `// ${TODO_SPARTACUS} this method was moved to 'ClientTokenService'.`,
  },
  {
    class: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: 'isClientTokenLoaded',
    comment: `// ${TODO_SPARTACUS} this method was moved to 'ClientTokenService'.`,
  },
];
