import {
  ACTIVE_CART_SERVICE,
  ANONYMOUS_USERID_CONST,
  AUTH_SERVICE,
  CART_COMBINED_EFFECTS,
  CART_DATA_SERVICE,
  CART_EFFECTS,
  CART_ENTRY_EFFECTS,
  CART_SELECTORS,
  CART_SERVICE,
  CART_VOUCHER_EFFECTS,
  CLEAR_CART_STATE,
  CLEAR_MULTI_CART_STATE,
  CONTEXT_SERVICE_PROVIDERS,
  GET_MULTI_CART_REDUCERS,
  GET_REDUCERS,
  INITITIALIZE_CONTEXT,
  INIT_SITE_CONTEXT_ROUTES_HANDLER,
  META_REDUCERS,
  MULTI_CART_META_REDUCERS,
  MULTI_CART_REDUCER_PROVIDER,
  MULTI_CART_REDUCER_TOKEN,
  REDUCER_PROVIDER,
  REDUCER_TOKEN,
  SITE_CONTEXT_PARAMS_PROVIDERS,
  SPARTACUS_CORE,
  WISHLIST_EFFECTS,
} from '../../shared/constants';
import { DeprecatedNode } from '../../shared/utils/file-utils';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/cart/store/effects/cart.effect.ts
  {
    node: CART_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/wishlist.effect.ts
  {
    node: WISHLIST_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/cart-voucher.effect.ts
  {
    node: CART_VOUCHER_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/cart-entry.effect.ts
  {
    node: CART_ENTRY_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/effects/index.ts
  {
    node: CART_COMBINED_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: GET_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: REDUCER_TOKEN,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: REDUCER_PROVIDER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: CLEAR_CART_STATE,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: META_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: CLEAR_MULTI_CART_STATE,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_META_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_REDUCER_TOKEN,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: GET_MULTI_CART_REDUCERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/cart/store/reducers/index.ts
  {
    node: MULTI_CART_REDUCER_PROVIDER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/site-context-params-providers.ts
  {
    node: SITE_CONTEXT_PARAMS_PROVIDERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/site-context-params-providers.ts
  {
    node: INIT_SITE_CONTEXT_ROUTES_HANDLER,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/index.ts
  {
    node: INITITIALIZE_CONTEXT,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/site-context/providers/context-service-providers.ts
  {
    node: CONTEXT_SERVICE_PROVIDERS,
    importPath: SPARTACUS_CORE,
  },
  // projects/core/src/occ/index.ts
  {
    node: ANONYMOUS_USERID_CONST,
    importPath: SPARTACUS_CORE,
    comment: `'${ANONYMOUS_USERID_CONST}' is no longer part of the public API. Instead use 'OCC_USER_ID_ANONYMOUS'.`,
  },
  // projects/core/src/cart/store/selectors/index.ts
  {
    node: CART_SELECTORS,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_SELECTORS}' are no longer part of the public API. Instead use 'ActiveCartService', 'MultiCartState' and 'MultiCartSelectors'.`,
  },
  // projects/core/src/cart/facade/cart.service.ts
  {
    node: CART_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_SERVICE}' is no longer part of the public API. Instead use '${ACTIVE_CART_SERVICE}'.`,
  },
  // projects/core/src/cart/facade/cart-data.service.ts
  {
    node: CART_DATA_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_DATA_SERVICE}' is no longer part of the public API. Instead use methods from '${ACTIVE_CART_SERVICE}' and '${AUTH_SERVICE}.'`,
  },
];
