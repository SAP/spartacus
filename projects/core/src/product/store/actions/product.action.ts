import { Product } from '../../../occ-models';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction
} from '../../../store-entities/entity.action';
export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export class LoadProduct extends EntityLoadAction {
  readonly type = 'LOAD PRODUCT';
  constructor(productCode: string) {
    super(PRODUCT_DETAIL_ENTITY, productCode);
  }
}

export class LoadProductFail extends EntityFailAction {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(public payload: any) {
    super(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export class LoadProductSuccess extends EntitySuccessAction {
  readonly type = LOAD_PRODUCT;
  constructor(public payload: Product) {
    super(PRODUCT_DETAIL_ENTITY, payload.code);
  }
}

// action types
export type ProductAction = LoadProduct | LoadProductFail | LoadProductSuccess;
