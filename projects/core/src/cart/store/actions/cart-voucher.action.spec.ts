import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  failMeta,
  loadMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';
import { ADD_VOUCHER_PROCESS_ID } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const voucherId = 'testVoucherId';

describe('Cart-voucher Actions', () => {
  describe('CartAddVoucher Actions', () => {
    describe('AddVoucher', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          voucherId: voucherId,
        };
        const action = new CartActions.CartAddVoucher(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_VOUCHER,
          payload: payload,
          meta: entityLoadMeta(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID),
        });
      });
    });

    describe('AddVoucherFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CartAddVoucherFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_VOUCHER_FAIL,
          payload: error,
          meta: entityFailMeta(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID, error),
        });
      });
    });

    describe('AddVoucherSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.CartAddVoucherSuccess({
          userId: 'userId',
          cartId: 'cartId',
        });
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_VOUCHER_SUCCESS,
          payload: { userId: 'userId', cartId: 'cartId' },
          meta: entitySuccessMeta(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID),
        });
      });
    });

    describe('CartResetAddVoucher', () => {
      it('should create the action', () => {
        const action = new CartActions.CartResetAddVoucher();
        expect({ ...action }).toEqual({
          type: CartActions.CART_RESET_ADD_VOUCHER,
          meta: entityResetMeta(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID),
        });
      });
    });
  });

  describe('CartRemoveVoucher Actions', () => {
    describe('RemoveVoucher', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          voucherId: voucherId,
        };
        const action = new CartActions.CartRemoveVoucher(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_VOUCHER,
          payload: payload,
          meta: loadMeta(CART_DATA),
        });
      });
    });

    describe('RemoveVoucherFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CartRemoveVoucherFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_VOUCHER_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error),
        });
      });
    });

    describe('RemoveVoucherSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.CartRemoveVoucherSuccess({
          userId: 'userId',
          cartId: 'cartId',
        });
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_VOUCHER_SUCCESS,
          payload: { userId: 'userId', cartId: 'cartId' },
          meta: successMeta(CART_DATA),
        });
      });
    });
  });
});
