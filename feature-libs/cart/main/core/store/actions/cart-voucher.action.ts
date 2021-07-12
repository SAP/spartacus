import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityLoaderResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { ADD_VOUCHER_PROCESS_ID, MULTI_CART_DATA } from '../multi-cart-state';

export const CART_ADD_VOUCHER = '[Cart-voucher] Add Cart Vouchers';
export const CART_ADD_VOUCHER_FAIL = '[Cart-voucher] Add Cart Voucher Fail';
export const CART_ADD_VOUCHER_SUCCESS =
  '[Cart-voucher] Add Cart Voucher Success';
export const CART_RESET_ADD_VOUCHER = '[Cart-voucher] Reset Add Cart Voucher';

export const CART_REMOVE_VOUCHER = '[Cart-voucher] Remove Cart Voucher';
export const CART_REMOVE_VOUCHER_FAIL =
  '[Cart-voucher] Remove Cart Voucher Fail';
export const CART_REMOVE_VOUCHER_SUCCESS =
  '[Cart-voucher] Remove Cart Voucher Success';

// Adding cart voucher actions
export class CartAddVoucher extends EntityLoadAction {
  readonly type = CART_ADD_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

export class CartAddVoucherFail extends EntityFailAction {
  readonly type = CART_ADD_VOUCHER_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      voucherId: string;
      error: any;
    }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID, payload.error);
  }
}

export class CartAddVoucherSuccess extends EntitySuccessAction {
  readonly type = CART_ADD_VOUCHER_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

// TODO(#7241): Remove when switching to event system for vouchers
/**
 * Resets add voucher process
 *
 * @deprecated since 2.0
 */
export class CartResetAddVoucher extends EntityLoaderResetAction {
  readonly type = CART_RESET_ADD_VOUCHER;
  constructor() {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

// Deleting cart voucher
export class CartRemoveVoucher extends EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveVoucherFail extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_VOUCHER_FAIL;
  constructor(
    public payload: {
      error: any;
      cartId: string;
      userId: string;
      voucherId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CartRemoveVoucherSuccess extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_VOUCHER_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

// action types
export type CartVoucherAction =
  | CartAddVoucher
  | CartAddVoucherFail
  | CartAddVoucherSuccess
  | CartResetAddVoucher
  | CartRemoveVoucher
  | CartRemoveVoucherFail
  | CartRemoveVoucherSuccess;
