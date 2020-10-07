import { Product } from 'projects/core/src/model/product.model';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from 'projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const CREATE_BUNDLE = '[Cart] Create Bundle';
export const CREATE_BUNDLE_SUCCESS = '[Cart] Create Bundle Success';
export const CREATE_BUNDLE_FAIL = '[Cart] Create Bundle Fail';
export const GET_BUNDLES = '[Cart] Get Bundles';
export const GET_BUNDLES_SUCCESS = '[Cart] Get Bundles Success';
export const GET_BUNDLES_FAIL = '[Cart] Get Bundles Fail';
export const UPDATE_BUNDLE = '[Cart] Update Bundle';
export const UPDATE_BUNDLE_SUCCESS = '[Cart] Update Bundle Success';
export const UPDATE_BUNDLE_FAIL = '[Cart] Update Bundle Fail';
export const REMOVE_BUNDLE = '[Cart] Remove Bundle';
export const REMOVE_BUNDLE_SUCCESS = '[Cart] Remove Bundle Success';
export const REMOVE_BUNDLE_FAIL = '[Cart] Remove Bundle Fail';
export const GET_BUNDLE_ALLOWED_PRODUCTS = '[Cart] Get Bundle Allowed Products';
export const GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS =
  '[Cart] Get Bundle Allowed Products Success';
export const GET_BUNDLE_ALLOWED_PRODUCTS_FAIL =
  '[Cart] Get Bundle Allowed Products Fail';

export class CreateBundle extends EntityProcessesIncrementAction {
  readonly type = CREATE_BUNDLE;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      productCode: string;
      quantity: number;
      templateId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CreateBundleSuccess extends EntityProcessesDecrementAction {
  readonly type = CREATE_BUNDLE_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      // productCode: string;
      // quantity: number;
      // deliveryModeChanged: boolean;
      // entry: OrderEntry;
      // quantityAdded: number;
      statusCode: string;
      statusMessage: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CreateBundleFail extends EntityProcessesDecrementAction {
  readonly type = CREATE_BUNDLE_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      productCode: string;
      quantity: number;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundles extends EntityProcessesIncrementAction {
  readonly type = GET_BUNDLES;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundlesSuccess extends EntityProcessesDecrementAction {
  readonly type = GET_BUNDLES_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      // productCode: string;
      // quantity: number;
      // deliveryModeChanged: boolean;
      // entry: OrderEntry;
      // quantityAdded: number;
      statusCode: string;
      statusMessage: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class GetBundlesFail extends EntityProcessesDecrementAction {
  readonly type = GET_BUNDLES_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      // productCode: string;
      // quantity: number;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveBundle extends EntityProcessesIncrementAction {
  readonly type = REMOVE_BUNDLE;
  constructor(
    public payload: { cartId: string; userId: string; entryGroupId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveBundleSuccess extends EntityProcessesDecrementAction {
  readonly type = REMOVE_BUNDLE_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; entryGroupId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class RemoveBundleFail extends EntityProcessesDecrementAction {
  readonly type = REMOVE_BUNDLE_FAIL;
  constructor(
    public payload: {
      error: any;
      cartId: string;
      userId: string;
      entryGroupId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class UpdateBundle extends EntityProcessesIncrementAction {
  readonly type = UPDATE_BUNDLE;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryGroupId: string;
      product: Product;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class UpdateBundleSuccess extends EntityProcessesDecrementAction {
  readonly type = UPDATE_BUNDLE_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryGroupId: string;
      product: Product;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class UpdateBundleFail extends EntityProcessesDecrementAction {
  readonly type = UPDATE_BUNDLE_FAIL;
  constructor(
    public payload: {
      error: any;
      userId: string;
      cartId: string;
      entryGroupId: string;
      product: Product;
      quantity: number;
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
      // productCode: string;
      // quantity: number;
      // deliveryModeChanged: boolean;
      // entry: OrderEntry;
      // quantityAdded: number;
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
      userId: string;
      cartId: string;
      entryGroupNumber: number;
      // productCode: string;
      // quantity: number;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export type CartBundleAction =
  | CreateBundle
  | CreateBundleSuccess
  | CreateBundleFail
  | UpdateBundle
  | UpdateBundleSuccess
  | UpdateBundleFail
  | RemoveBundle
  | RemoveBundleSuccess
  | RemoveBundleFail
  | GetBundleAllowedProducts
  | GetBundleAllowedProductsSuccess
  | GetBundleAllowedProductsFail;
