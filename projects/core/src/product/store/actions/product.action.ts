import { Action } from '@ngrx/store';
import { Product } from '../../../occ-models';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_START = '[Product] Load Product Data Start';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export class LoadProduct implements Action {
  readonly type = LOAD_PRODUCT;
  payload: string;
  meta: { reload: boolean };
  constructor(productCode: string, reload: boolean = false) {
    this.payload = productCode;
    this.meta = { reload };
  }
}

export class LoadProductStart implements Action {
  readonly type = LOAD_PRODUCT_START;
  constructor(public payload: string) {}
}

export class LoadProductFail implements Action {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductSuccess implements Action {
  readonly type = LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

// action types
export type ProductAction =
  | LoadProduct
  | LoadProductStart
  | LoadProductFail
  | LoadProductSuccess;
