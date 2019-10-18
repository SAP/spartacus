import { Product } from '../../../model/product.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { PRODUCT_DETAIL_ENTITY } from '../product-state';
import { EntityLoaderMeta } from '../../../state/utils/entity-loader/entity-loader.action';
import { Action } from '@ngrx/store';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export interface ProductMeta extends EntityLoaderMeta {
  scope?: string;
}

export interface EntityScopedLoaderAction extends Action {
  readonly payload?: any;
  readonly meta?: ProductMeta;
}

export class LoadProduct extends StateEntityLoaderActions.EntityLoadAction
  implements EntityScopedLoaderAction {
  readonly type = LOAD_PRODUCT;
  readonly meta: ProductMeta;
  constructor(public payload: string, scope?: string) {
    super(PRODUCT_DETAIL_ENTITY, payload);
    this.meta.scope = scope;
  }
}

export class LoadProductFail extends StateEntityLoaderActions.EntityFailAction
  implements EntityScopedLoaderAction {
  readonly type = LOAD_PRODUCT_FAIL;
  readonly meta: ProductMeta;
  constructor(productCode: string, public payload: any, scope?: string) {
    super(PRODUCT_DETAIL_ENTITY, productCode, payload);
    this.meta.scope = scope;
  }
}

export class LoadProductSuccess
  extends StateEntityLoaderActions.EntitySuccessAction
  implements EntityScopedLoaderAction {
  readonly type = LOAD_PRODUCT_SUCCESS;
  readonly meta: ProductMeta;
  constructor(public payload: Product, scope?: string) {
    super(PRODUCT_DETAIL_ENTITY, payload.code);
    this.meta.scope = scope;
  }
}

// action types
export type ProductAction = LoadProduct | LoadProductFail | LoadProductSuccess;
