import { Action } from '@ngrx/store';
import { Product } from '../../../model/product.model';
import { EntityLoaderMeta } from '../../../state/utils/entity-loader/entity-loader.action';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { ProductScope } from '../../model/product-scope';
import { PRODUCT_DETAIL_ENTITY } from '../product-state';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';
export const CLEAR_PRODUCT_PRICE = '[Product] Clear Product PRICE';

export interface ProductMeta extends EntityLoaderMeta {
  scope?: string;
}

export interface EntityScopedLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: ProductMeta;
}

export class LoadProduct extends EntityScopedLoaderActions.EntityScopedLoadAction {
  readonly type = LOAD_PRODUCT;
  constructor(public payload: string, scope = '') {
    super(PRODUCT_DETAIL_ENTITY, payload, scope);
  }
}

export class LoadProductFail extends EntityScopedLoaderActions.EntityScopedFailAction {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(productCode: string, public payload: any, scope = '') {
    super(PRODUCT_DETAIL_ENTITY, productCode, scope, payload);
  }
}

export class LoadProductSuccess extends EntityScopedLoaderActions.EntityScopedSuccessAction {
  readonly type = LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product, scope = '') {
    super(PRODUCT_DETAIL_ENTITY, payload.code, scope);
  }
}

export class ClearProductPrice extends EntityScopedLoaderActions.EntityScopedResetAction {
  readonly type = CLEAR_PRODUCT_PRICE;
  constructor() {
    super(PRODUCT_DETAIL_ENTITY, undefined, ProductScope.PRICE);
  }
}

// action types
export type ProductAction =
  | LoadProduct
  | LoadProductFail
  | LoadProductSuccess
  | ClearProductPrice;
