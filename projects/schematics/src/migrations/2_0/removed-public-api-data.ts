import {
  CART_COMBINED_EFFECTS,
  CART_EFFECTS,
  CART_ENTRY_EFFECTS,
  CART_VOUCHER_EFFECTS,
  CLEAR_CART_STATE,
  CLEAR_MULTI_CART_STATE,
  GET_MULTI_CART_REDUCERS,
  GET_REDUCERS,
  META_REDUCERS,
  MULTI_CART_META_REDUCERS,
  MULTI_CART_REDUCER_PROVIDER,
  MULTI_CART_REDUCER_TOKEN,
  REDUCER_PROVIDER,
  REDUCER_TOKEN,
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
];
