import { Breadcrumb, Facet, MULTI_CART_DATA, OrderEntry, Product, SearchConfig, SearchState, SpellingSuggestion, StateUtils } from '@spartacus/core';
import { Pagination, Sort } from 'projects/core/src/model/unused.model';
import { BundleStarter } from '../../model/bundle.model';


export const START_BUNDLE = '[Bundle] Start Bundle';
export const START_BUNDLE_SUCCESS = '[Bundle] Start Bundle Success';
export const START_BUNDLE_FAIL = '[Bundle] Start Bundle Fail';
export const GET_BUNDLE_ALLOWED_PRODUCTS =
  '[Bundle] Get Bundle Allowed Products';
export const GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS =
  '[Bundle] Get Bundle Allowed Products Success';
export const GET_BUNDLE_ALLOWED_PRODUCTS_FAIL =
  '[Bundle] Get Bundle Allowed Products Fail';

export class StartBundle extends StateUtils.LoaderLoadAction {
  readonly type = START_BUNDLE;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      bundleStarter: BundleStarter;
    }
  ) {
    super(MULTI_CART_DATA,);
  }
}

export class StartBundleSuccess extends StateUtils.LoaderSuccessAction {
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
    super(MULTI_CART_DATA,);
  }
}

export class StartBundleFail extends StateUtils.LoaderFailAction {
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

export class GetBundleAllowedProducts extends StateUtils.LoaderLoadAction {
  readonly type = GET_BUNDLE_ALLOWED_PRODUCTS;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      entryGroupNumber: number;
      searchConfig: SearchConfig | undefined;
    }
  ) {
    super(MULTI_CART_DATA);
  }
}

export class GetBundleAllowedProductsSuccess extends StateUtils.LoaderSuccessAction {
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
    super(MULTI_CART_DATA,);
  }
}

export class GetBundleAllowedProductsFail extends StateUtils.LoaderFailAction {
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
