import { PRODUCT_DETAIL_ENTITY } from '../product-state';
import { Product } from '../../../occ/occ-models/occ.models';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction
} from '../../../state/utils/entity-loader/entity-loader.action';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';

export class LoadProduct extends EntityLoadAction {
  readonly type = LOAD_PRODUCT;
  constructor(public payload: string) {
    super(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export class LoadProductFail extends EntityFailAction {
  readonly type = LOAD_PRODUCT_FAIL;
  constructor(productCode: string, public payload: any) {
    super(PRODUCT_DETAIL_ENTITY, productCode, payload);
  }
}

export class LoadProductSuccess extends EntitySuccessAction {
  readonly type = LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {
    super(PRODUCT_DETAIL_ENTITY, payload.code);
  }
}

// action types
export type ProductAction = LoadProduct | LoadProductFail | LoadProductSuccess;
