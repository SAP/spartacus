import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  failMeta,
  loadMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import { ADD_VOUCHER_PROCESS_ID, CART_DATA } from '../cart-state';
import * as fromCartVoucher from './cart-voucher.action';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const voucherId = 'testVoucherId';

describe('Cart-voucher Actions', () => {
  describe('AddCartVoucher Actions', () => {
    describe('AddVoucher', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          voucherId: voucherId,
        };
        const action = new fromCartVoucher.AddCartVoucher(payload);
        expect({ ...action }).toEqual({
          type: fromCartVoucher.ADD_CART_VOUCHER,
          payload: payload,
          meta: entityLoadMeta(CART_DATA, ADD_VOUCHER_PROCESS_ID),
        });
      });
    });

    describe('AddVoucherFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCartVoucher.AddCartVoucherFail(error);

        expect({ ...action }).toEqual({
          type: fromCartVoucher.ADD_CART_VOUCHER_FAIL,
          payload: error,
          meta: entityFailMeta(CART_DATA, ADD_VOUCHER_PROCESS_ID, error),
        });
      });
    });

    describe('AddVoucherSuccess', () => {
      it('should create the action', () => {
        const action = new fromCartVoucher.AddCartVoucherSuccess({});
        expect({ ...action }).toEqual({
          type: fromCartVoucher.ADD_CART_VOUCHER_SUCCESS,
          payload: {},
          meta: entitySuccessMeta(CART_DATA, ADD_VOUCHER_PROCESS_ID),
        });
      });
    });
  });

  describe('RemoveCartVoucher Actions', () => {
    describe('RemoveVoucher', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          voucherId: voucherId,
        };
        const action = new fromCartVoucher.RemoveCartVoucher(payload);
        expect({ ...action }).toEqual({
          type: fromCartVoucher.REMOVE_CART_VOUCHER,
          payload: payload,
          meta: loadMeta(CART_DATA),
        });
      });
    });

    describe('RemoveVoucherFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCartVoucher.RemoveCartVoucherFail(error);

        expect({ ...action }).toEqual({
          type: fromCartVoucher.REMOVE_CART_VOUCHER_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error),
        });
      });
    });

    describe('RemoveVoucherSuccess', () => {
      it('should create the action', () => {
        const action = new fromCartVoucher.RemoveCartVoucherSuccess();
        expect({ ...action }).toEqual({
          type: fromCartVoucher.REMOVE_CART_VOUCHER_SUCCESS,
          meta: successMeta(CART_DATA),
        });
      });
    });
  });
});
