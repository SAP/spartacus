import * as fromSaveForLater from './../actions/save-for-later.action';
import { CART_DATA } from '../cart-state';
import {
  failMeta,
  loadMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import { Cart } from '../../../model/cart.model';

const cart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

describe('SaveForLater actions', () => {
  describe('Create SaveForLater Actions', () => {
    describe('CreateSaveForLater', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const action = new fromSaveForLater.CreateSaveForLater(userId);
        expect({ ...action }).toEqual({
          type: fromSaveForLater.CREATE_SAVE_FOR_LATER,
          payload: userId,
          meta: loadMeta(CART_DATA),
        });
      });
    });

    describe('CreateSaveForLaterFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromSaveForLater.CreateSaveForLaterFail(error);

        expect({ ...action }).toEqual({
          type: fromSaveForLater.CREATE_SAVE_FOR_LATER_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error),
        });
      });
    });

    describe('CreateSaveForLaterSuccess ', () => {
      it('should create the action', () => {
        const action = new fromSaveForLater.CreateSaveForLaterSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromSaveForLater.CREATE_SAVE_FOR_LATER_SUCCESS,
          payload: cart,
          meta: successMeta(CART_DATA),
        });
      });
    });
  });

  describe('LoadSaveForLater Actions', () => {
    describe('LoadSaveForLater', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new fromSaveForLater.LoadSaveForLater({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: fromSaveForLater.LOAD_SAVE_FOR_LATER,
          payload: { userId: userId, cartId: cartId },
          meta: loadMeta(CART_DATA),
        });
      });
    });

    describe('LoadSaveForLaterFail', () => {
      it('should load the action', () => {
        const error = 'anError';
        const action = new fromSaveForLater.LoadSaveForLaterFail(error);
        expect({ ...action }).toEqual({
          type: fromSaveForLater.LOAD_SAVE_FOR_LATER_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error),
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should load the action', () => {
        const action = new fromSaveForLater.LoadSaveForLaterSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromSaveForLater.LOAD_SAVE_FOR_LATER_SUCCESS,
          payload: cart,
          meta: successMeta(CART_DATA),
        });
      });
    });
  });
});
