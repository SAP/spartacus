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

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_VOUCHER = '[Cart-voucher] Add Cart Vouchers';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_VOUCHER_FAIL = '[Cart-voucher] Add Cart Voucher Fail';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_VOUCHER_SUCCESS =
  '[Cart-voucher] Add Cart Voucher Success';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_RESET_ADD_VOUCHER = '[Cart-voucher] Reset Add Cart Voucher';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_VOUCHER = '[Cart-voucher] Remove Cart Voucher';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_VOUCHER_FAIL =
  '[Cart-voucher] Remove Cart Voucher Fail';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_VOUCHER_SUCCESS =
  '[Cart-voucher] Remove Cart Voucher Success';

// Adding cart voucher actions
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartAddVoucher extends EntityLoadAction {
  readonly type = CART_ADD_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
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

/**
 * @deprecated since 4.1 - use cart lib instead
 */
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
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartResetAddVoucher extends EntityLoaderResetAction {
  readonly type = CART_RESET_ADD_VOUCHER;
  constructor() {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

// Deleting cart voucher
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartRemoveVoucher extends EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_VOUCHER;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
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

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartRemoveVoucherSuccess extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_VOUCHER_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; voucherId: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

// action types
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export type CartVoucherAction =
  | CartAddVoucher
  | CartAddVoucherFail
  | CartAddVoucherSuccess
  | CartResetAddVoucher
  | CartRemoveVoucher
  | CartRemoveVoucherFail
  | CartRemoveVoucherSuccess;
