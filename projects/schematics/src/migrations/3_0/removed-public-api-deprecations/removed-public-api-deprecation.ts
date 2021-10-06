import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ABSTRACT_STORE_ITEM_COMPONENT,
  ASM_AUTH_SERVICE,
  AUTHENTICATION_TOKEN,
  AUTH_FEATURE,
  AUTH_SELECTORS,
  AUTH_SERVICE,
  AUTH_STATE,
  CSAGENT_TOKEN_DATA,
  CS_AGENT_AUTH_SERVICE,
  CUSTOMER_SUPPORT_AGENT_TOKEN_INTERCEPTOR,
  FIND_STORES_STATE,
  GOOGLE_MAP_RENDERER_SERVICE,
  KYMA_ACTIONS,
  KYMA_CONFIG,
  KYMA_FEATURE,
  KYMA_MODULE,
  KYMA_SELECTORS,
  KYMA_SERVICE,
  KYMA_STATE,
  OCC_STORE_FINDER_ADAPTER,
  OPEN_ID_AUTHENTICATION_TOKEN_SERVICE,
  OPEN_ID_TOKEN,
  OPEN_ID_TOKEN_DATA,
  SCHEDULE_COMPONENT,
  SEARCH_CONFIG,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  SPLIT_VIEW_DEACTIVATE_GUARD,
  STATE_WITH_AUTH,
  STATE_WITH_KYMA,
  STATE_WITH_STORE_FINDER,
  STORES_STATE,
  STORE_COUNT,
  STORE_COUNT_NORMALIZER,
  STORE_DATA_SERVICE,
  STORE_ENTITIES,
  STORE_FINDER_ACTIONS,
  STORE_FINDER_ADAPTER,
  STORE_FINDER_COMPONENT,
  STORE_FINDER_CONFIG,
  STORE_FINDER_CONNECTOR,
  STORE_FINDER_CORE_MODULE,
  STORE_FINDER_DATA,
  STORE_FINDER_FEATURE,
  STORE_FINDER_GRID_COMPONENT,
  STORE_FINDER_HEADER_COMPONENT,
  STORE_FINDER_LIST_COMPONENT,
  STORE_FINDER_LIST_ITEM_COMPONENT,
  STORE_FINDER_MAP_COMPONENT,
  STORE_FINDER_MODULE,
  STORE_FINDER_OCC_MODULE,
  STORE_FINDER_PAGINATION_DETAILS_COMPONENT,
  STORE_FINDER_SEARCH_COMPONENT,
  STORE_FINDER_SEARCH_CONFIG,
  STORE_FINDER_SEARCH_PAGE,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
  STORE_FINDER_SEARCH_QUERY,
  STORE_FINDER_SEARCH_RESULT_COMPONENT,
  STORE_FINDER_SELECTORS,
  STORE_FINDER_SERVICE,
  STORE_FINDER_STORES_COUNT_COMPONENT,
  STORE_FINDER_STORE_COMPONENT,
  STORE_FINDER_STORE_DESCRIPTION_COMPONENT,
  TOKEN_REVOCATION_HEADER,
  UNAUTHORIZED_ERROR_HANDLER,
  USER_TOKEN,
  USER_TOKEN_STATE,
  VIEW_ALL_STORES_STATE,
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
  // projects/core/src/occ/adapters/store-finder/occ-store-finder.adapter.ts
  {
    node: OCC_STORE_FINDER_ADAPTER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_STORE_FINDER_ADAPTER}' was moved to @spartacus/storefinder/occ.`,
  },
  // projects/core/src/occ/adapters/store-finder/store-finder-occ.module.ts
  {
    node: STORE_FINDER_OCC_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_OCC_MODULE} was moved to @spartacus/storefinder/occ.`,
  },
  // projects/core/src/store-finder/config/store-finder-config.ts
  {
    node: STORE_FINDER_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_CONFIG}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/connectors/converters.ts
  {
    node: STORE_FINDER_SEARCH_PAGE_NORMALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SEARCH_PAGE_NORMALIZER}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/connectors/converters.ts
  {
    node: STORE_COUNT_NORMALIZER,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_COUNT_NORMALIZER}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/connectors/store-finder.connector.ts
  {
    node: STORE_FINDER_CONNECTOR,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_CONNECTOR}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/connectors/store-finder.adapter.ts
  {
    node: STORE_FINDER_ADAPTER,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_ADAPTER}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/facade/store-data.service.ts
  {
    node: STORE_DATA_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_DATA_SERVICE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/facade/store-finder.service.ts
  {
    node: STORE_FINDER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SERVICE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/model/store-entities.ts
  {
    node: STORE_ENTITIES,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_ENTITIES}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/model/search-query.ts
  {
    node: STORE_FINDER_SEARCH_QUERY,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SEARCH_QUERY}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/service/google-map-renderer.service.ts
  {
    node: GOOGLE_MAP_RENDERER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${GOOGLE_MAP_RENDERER_SERVICE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store-finder.module.ts
  {
    node: STORE_FINDER_CORE_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_CORE_MODULE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: STORE_FINDER_FEATURE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_FEATURE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: STORE_FINDER_DATA,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_DATA}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: STATE_WITH_STORE_FINDER,
    importPath: SPARTACUS_CORE,
    comment: `'${STATE_WITH_STORE_FINDER}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: STORES_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORES_STATE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: FIND_STORES_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${FIND_STORES_STATE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/store-finder-state.ts
  {
    node: VIEW_ALL_STORES_STATE,
    importPath: SPARTACUS_CORE,
    comment: `'${VIEW_ALL_STORES_STATE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/selectors/index.ts
  {
    node: STORE_FINDER_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SELECTORS}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/store/actions/index.ts
  {
    node: STORE_FINDER_ACTIONS,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_ACTIONS}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/model/store-finder.model.ts
  {
    node: STORE_COUNT,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_COUNT}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/core/src/store-finder/model/store-finder.model.ts
  {
    node: STORE_FINDER_SEARCH_PAGE,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SEARCH_PAGE}' was moved to @spartacus/storefinder/core.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/abstract-store-item/abstract-store-item.component.ts
  {
    node: ABSTRACT_STORE_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ABSTRACT_STORE_ITEM_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/schedule-component/schedule.component.ts
  {
    node: SCHEDULE_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${SCHEDULE_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-grid/store-finder-grid.component.ts
  {
    node: STORE_FINDER_GRID_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_GRID_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts
  {
    node: STORE_FINDER_LIST_ITEM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_LIST_ITEM_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-map/store-finder-map.component.ts
  {
    node: STORE_FINDER_MAP_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_MAP_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-search-result/store-finder-list/store-finder-list.component.ts
  {
    node: STORE_FINDER_LIST_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_LIST_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-search-result/store-finder-search-result.component.ts
  {
    node: STORE_FINDER_SEARCH_RESULT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_SEARCH_RESULT_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-search/store-finder-search.component.ts
  {
    node: STORE_FINDER_SEARCH_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_SEARCH_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-store-description/store-finder-store-description.component.ts
  {
    node: STORE_FINDER_STORE_DESCRIPTION_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_STORE_DESCRIPTION_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-store/store-finder-store.component.ts
  {
    node: STORE_FINDER_STORE_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_STORE_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-stores-count/store-finder-stores-count.component.ts
  {
    node: STORE_FINDER_STORES_COUNT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_STORES_COUNT_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/store-finder.module.ts
  {
    node: STORE_FINDER_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_MODULE}' was renamed to 'StoreFinderComponentsModule' and moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-header/store-finder-header.component.ts
  {
    node: STORE_FINDER_HEADER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_HEADER_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder-pagination-details/store-finder-pagination-details.component.ts
  {
    node: STORE_FINDER_PAGINATION_DETAILS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_PAGINATION_DETAILS_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/storefrontlib/cms-components/storefinder/components/store-finder/store-finder.component.ts
  {
    node: STORE_FINDER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${STORE_FINDER_COMPONENT}' was moved to @spartacus/storefinder/components.`,
  },
  // projects/core/src/occ/utils/interceptor-util.ts
  {
    node: TOKEN_REVOCATION_HEADER,
    importPath: SPARTACUS_CORE,
    comment: `'${TOKEN_REVOCATION_HEADER} has been removed and is no longer part of the public API.`,
  },
  // projects/storefrontlib/shared/components/split-view/split-view-deactivate.guard.ts
  {
    node: SPLIT_VIEW_DEACTIVATE_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${SPLIT_VIEW_DEACTIVATE_GUARD} has been removed and is no longer part of the public API.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
