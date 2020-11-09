import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  AUTH_FEATURE,
  AUTH_SELECTORS,
  AUTH_STATE,
  SPARTACUS_CORE,
  STATE_WITH_AUTH,
  USER_TOKEN,
  USER_TOKEN_STATE
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/auth/store/selectors/index.ts
  {
    node: AUTH_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `'${AUTH_SELECTORS}' were removed. To access selectors related to client token use 'ClientAuthSelectors'. To get user token use 'AuthStorageService.getToken' method.`,
  },
  // projects/core/src/auth/store/auth-state.ts
  {
    node: STATE_WITH_AUTH,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_AUTH}' was removed. State related to client token was moved to 'StateWithClientAuth'. Data related to user token are stored in 'AuthStorageService' and 'UserIdService'`,
  },
  // projects/core/src/auth/store/auth-state.ts
  {
    node: AUTH_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${AUTH_STATE}' was removed. State related to client token was moved to 'ClientAuthState'. Data related to user token are stored in 'AuthStorageService' and 'UserIdService'`,
  },
  // projects/core/src/auth/store/auth-state.ts
  {
    node: USER_TOKEN_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_TOKEN_STATE}' was removed. Data related to user token are no longer stored in ngrx store. User token is stored in 'AuthStorageService' and user id is stored in 'UserIdService'`,
  },
  // projects/core/src/auth/store/auth-state.ts
  {
    node: AUTH_FEATURE,
    importPath: SPARTACUS_CORE,
    comment: `'${AUTH_FEATURE}' was removed. The key for store feature related to client token is in variable 'CLIENT_AUTH_FEATURE'`.
  },
  // projects/core/src/auth/models/token-types.model.ts
  {
    node: USER_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_TOKEN} was removed. Instead of 'AuthToken'. Adjust old properties to new interface shape.`
  }
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
