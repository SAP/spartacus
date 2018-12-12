import { Action } from '@ngrx/store';
import { Product } from '../../../occ/occ-models';
import { EntityAction, EntityMeta } from '../reducers/load.reducer';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export class LoadProduct2 implements Action {
  readonly type = LOAD_PRODUCT;
  constructor(public payload: string) {}
}

export class LoadProduct implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: string) {
    this.meta = { entity: {
      id: payload,
      load: true
    }};
  }
}


export class LoadProductFail2 implements Action {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductFail implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: any) {
    this.meta = { entity: {
        id: payload,
        error: true
    }};
  }
}


export class LoadProductSuccess implements Action {
  readonly type = LOAD_PRODUCT;
  meta: EntityMeta;
  constructor(public payload: Product) {
    this.meta = { entity: { id: payload.code } };
  }
}

export class LoadProductSuccess2 implements Action {
  readonly type = LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

// action types
export type ProductAction =
  | LoadProduct
  | LoadProductFail
  | LoadProductSuccess;
