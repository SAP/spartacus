import { BundleStarter } from '../../model/bundle.model';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { Pagination, Sort } from '../../../../../model/unused.model';
import { MULTI_CART_DATA } from '../../../../store/multi-cart-state';
import {
  Breadcrumb,
  Facet,
  OrderEntry,
  Product,
  SearchState,
  SpellingSuggestion,
} from '../../../../../model/index';
import { SearchConfig } from '../../../../../product/model/search-config';

export const START_BUNDLE = '[Bundle] Start Bundle';
export const START_BUNDLE_SUCCESS = '[Bundle] Start Bundle Success';
export const START_BUNDLE_FAIL = '[Bundle] Start Bundle Fail';
export const GET_BUNDLE_ALLOWED_PRODUCTS =
  '[Bundle] Get Bundle Allowed Products';
export const GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS =
  '[Bundle] Get Bundle Allowed Products Success';
export const GET_BUNDLE_ALLOWED_PRODUCTS_FAIL =
  '[Bundle] Get Bundle Allowed Products Fail';

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
