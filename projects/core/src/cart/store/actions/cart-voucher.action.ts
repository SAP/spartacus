import { PROCESS_FEATURE } from 'projects/core/src/process';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { ADD_VOUCHER_PROCESS_ID, CART_DATA } from '../cart-state';

export const ADD_CART_VOUCHER = '[Cart] Add Cart Vouchers';
export const ADD_CART_VOUCHER_FAIL = '[Cart] Add Cart Voucher Fail';
export const ADD_CART_VOUCHER_SUCCESS = '[Cart] Add Cart Voucher Success';

export const REMOVE_CART_VOUCHER = '[Cart] Remove Cart Voucher';
export const REMOVE_CART_VOUCHER_FAIL = '[Cart] Remove Cart Voucher Fail';
export const REMOVE_CART_VOUCHER_SUCCESS = '[Cart] Remove Cart Voucher Success';

// Adding cart voucher actions
export class AddCartVoucher extends EntityLoadAction {
  readonly type = ADD_CART_VOUCHER;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

export class AddCartVoucherFail extends EntityFailAction {
  readonly type = ADD_CART_VOUCHER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID, payload);
  }
}

export class AddCartVoucherSuccess extends EntitySuccessAction {
  readonly type = ADD_CART_VOUCHER_SUCCESS;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
  }
}

// Deleting cart voucher
export class RemoveCartVoucher extends LoaderLoadAction {
  readonly type = REMOVE_CART_VOUCHER;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class RemoveCartVoucherFail extends LoaderFailAction {
  readonly type = REMOVE_CART_VOUCHER_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class RemoveCartVoucherSuccess extends LoaderSuccessAction {
  readonly type = REMOVE_CART_VOUCHER_SUCCESS;
  constructor() {
    super(CART_DATA);
  }
}

// action types
export type CartVoucherAction =
  | AddCartVoucher
  | AddCartVoucherFail
  | AddCartVoucherSuccess
  | RemoveCartVoucher
  | RemoveCartVoucherFail
  | RemoveCartVoucherSuccess;
