import { OrderEntry } from 'projects/core/src/model/order.model';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from 'projects/core/src/state/utils/entity-processes-loader/entity-processes-loader.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

export const CREATE_BUNDLE = '[Cart] Create Bundle';
export const CREATE_BUNDLE_SUCCESS = '[Cart] Create Bundle Success';
export const CREATE_BUNDLE_FAIL = '[Cart] Create Bundle Fail';

export class CreateBundle extends EntityProcessesIncrementAction {
  readonly type = CREATE_BUNDLE;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      productCode: string;
      quantity: number;
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
      productCode: string;
      quantity: number;
      deliveryModeChanged: boolean;
      entry: OrderEntry;
      quantityAdded: number;
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

export type CartBundleAction =
  | CreateBundle
  | CreateBundleSuccess
  | CreateBundleFail;
