import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ASM_AUTH_SERVICE,
  AUTHENTICATION_TOKEN,
  AUTH_FEATURE,
  AUTH_SELECTORS,
  AUTH_SERVICE,
  AUTH_STATE,
  CSAGENT_TOKEN_DATA,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR,
  KYMA_ACTIONS,
  KYMA_CONFIG,
  KYMA_FEATURE,
  KYMA_MODULE,
  KYMA_SELECTORS,
  KYMA_SERVICE,
  KYMA_STATE,
  OPEN_ID_AUTHENTICATION_TOKEN_SERVICE,
  OPEN_ID_TOKEN,
  OPEN_ID_TOKEN_DATA,
  SEARCH_CONFIG,
  SPARTACUS_CORE,
  STATE_WITH_AUTH,
  STATE_WITH_KYMA,
  STORE_FINDER_SEARCH_CONFIG,
  UNAUTHORIZED_ERROR_HANDLER,
  USER_TOKEN,
  USER_TOKEN_STATE,
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
    comment: `'${AUTH_FEATURE}' was removed. The key for store feature related to client token is in variable 'CLIENT_AUTH_FEATURE'.`,
  },
  // projects/core/src/auth/models/token-types.model.ts
  {
    node: USER_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `'${USER_TOKEN} was removed. Instead of 'AuthToken'. Adjust old properties to new interface shape.`,
  },
  // projects/core/src/auth/models/token-types.model.ts
  {
    node: AUTHENTICATION_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `'${AUTHENTICATION_TOKEN} was removed. Instead use directly 'AuthToken' or 'ClientToken'.`,
  },
  // projects/core/src/kyma/store/selectors/index.ts
  {
    node: KYMA_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_SELECTORS}' were removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/store/kyma-state.ts
  {
    node: KYMA_FEATURE,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_FEATURE}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/store/kyma-state.ts
  {
    node: OPEN_ID_TOKEN_DATA,
    importPath: SPARTACUS_CORE,
    comment: `'${OPEN_ID_TOKEN_DATA}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/store/kyma-state.ts
  {
    node: STATE_WITH_KYMA,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_KYMA}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/store/kyma-state.ts
  {
    node: KYMA_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_STATE}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/store/actions/index.ts
  {
    node: KYMA_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_ACTIONS}' were removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/services/open-id-token/open-id-token.service.ts
  {
    node: OPEN_ID_AUTHENTICATION_TOKEN_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${OPEN_ID_AUTHENTICATION_TOKEN_SERVICE}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/models/kyma-token-types.model.ts
  {
    node: OPEN_ID_TOKEN,
    importPath: SPARTACUS_CORE,
    comment: `'${OPEN_ID_TOKEN}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/kyma.module.ts
  {
    node: KYMA_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_MODULE}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/facade/kyma.service.ts
  {
    node: KYMA_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_SERVICE}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/kyma/config/kyma-config.ts
  {
    node: KYMA_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${KYMA_CONFIG}' was removed. For replacement look into 3.0 migration documentation.`,
  },
  // projects/core/src/asm/facade/asm-auth.service.ts
  {
    node: ASM_AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${ASM_AUTH_SERVICE}' was renamed to ${CS_AGENT_AUTH_SERVICE}. New '${ASM_AUTH_SERVICE}' is responsible for making '${AUTH_SERVICE}' aware of ASM, but not for managing CS agent session.`,
  },
  // projects/core/src/asm/store/asm-state.ts
  {
    node: CSAGENT_TOKEN_DATA,
    importPath: SPARTACUS_CORE,
    comment: `'${CSAGENT_TOKEN_DATA}' was removed. Token is now stored in 'AuthStorageService'.`,
  },
  // projects/core/src/asm/http-interceptors/csagent-token.interceptor.ts
  {
    node: CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR,
    importPath: SPARTACUS_CORE,
    comment: `'${CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR} was removed. The functionality is now provided by 'AuthInterceptor' and 'AsmAuthHttpHeaderService'.`,
  },
  // projects/core/src/store-finder/model/search-config.ts
  {
    node: STORE_FINDER_SEARCH_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SEARCH_CONFIG}' is no longer part of the public API. Instead use the interface '${SEARCH_CONFIG}'.`,
  },
  // projects/core/src/global-message/http-interceptors/handlers/unauthorized/unauthorized.handler.ts
  {
    node: UNAUTHORIZED_ERROR_HANDLER,
    importPath: SPARTACUS_CORE,
    comment: `'${UNAUTHORIZED_ERROR_HANDLER}' has been removed and is no longer part of the public API.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
