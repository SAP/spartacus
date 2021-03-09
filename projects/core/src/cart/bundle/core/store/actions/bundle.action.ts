import {
  Breadcrumb,
  Facet,
  SearchState,
  SpellingSuggestion,
} from 'projects/core/src/model';
import { BundleStarter } from 'projects/core/src/cart/bundle/core/model/bundle.model';
import { OrderEntry } from 'projects/core/src/model/order.model';
import { Product } from 'projects/core/src/model/product.model';
import { Pagination, Sort } from 'projects/core/src/model/unused.model';
import { SearchConfig } from 'projects/core/src/product/model/search-config';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from 'projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.action';
import { MULTI_CART_DATA } from '../../../store/multi-cart-state';

export const START_BUNDLE = '[Cart] Start Bundle';
export const START_BUNDLE_SUCCESS = '[Cart] Start Bundle Success';
export const START_BUNDLE_FAIL = '[Cart] Start Bundle Fail';
export const GET_BUNDLE_ALLOWED_PRODUCTS = '[Cart] Get Bundle Allowed Products';
export const GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS =
  '[Cart] Get Bundle Allowed Products Success';
export const GET_BUNDLE_ALLOWED_PRODUCTS_FAIL =
  '[Cart] Get Bundle Allowed Products Fail';

export class StartBundle extends EntityProcessesIncrementAction {
  readonly type = START_BUNDLE;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      bundleStarter: BundleStarter;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class StartBundleSuccess extends EntityProcessesDecrementAction {
  readonly type = START_BUNDLE_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      deliveryModeChanged: boolean;
      entry: OrderEntry;
      quantity: number;
      quantityAdded: number;
      statusCode: string;
      statusMessage: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class StartBundleFail extends EntityProcessesDecrementAction {
  readonly type = START_BUNDLE_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      bundleStarter: BundleStarter;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundleAllowedProducts extends EntityProcessesIncrementAction {
  readonly type = GET_BUNDLE_ALLOWED_PRODUCTS;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      entryGroupNumber: number;
      searchConfig: SearchConfig | undefined;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundleAllowedProductsSuccess extends EntityProcessesDecrementAction {
  readonly type = GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryGroupNumber: number;
      breadcrumbs: Breadcrumb[];
      categoryCode: string;
      currentQuery: SearchState;
      facets: Facet[];
      freeTextSearch: string;
      keywordRedirectUrl: string;
      pagination: Pagination;
      products: Product[];
      sorts: Sort[];
      spellingSuggestion: SpellingSuggestion[];
      statusCode: string;
      statusMessage: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundleAllowedProductsFail extends EntityProcessesDecrementAction {
  readonly type = GET_BUNDLE_ALLOWED_PRODUCTS_FAIL;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      entryGroupNumber: number;
      searchConfig: SearchConfig;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export type CartBundleAction =
  | StartBundle
  | StartBundleSuccess
  | StartBundleFail
  | GetBundleAllowedProducts
  | GetBundleAllowedProductsSuccess
  | GetBundleAllowedProductsFail;
