import { Cart } from '../../../occ/occ-models/index';
import * as fromCart from './../actions/cart.action';
import { CART_DATA } from '../cart-state';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';

const cart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0
  }
};

describe('Cart Actions', () => {
  describe('CreateCart Actions', () => {
    describe('CreateCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const action = new fromCart.CreateCart(userId);
        expect({ ...action }).toEqual({
          type: fromCart.CREATE_CART,
          payload: userId,
          meta: loadMeta(CART_DATA)
        });
      });
    });

    describe('CreateCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCart.CreateCartFail(error);

        expect({ ...action }).toEqual({
          type: fromCart.CREATE_CART_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error)
        });
      });
    });

    describe('CreateCartSuccess', () => {
      it('should create the action', () => {
        const action = new fromCart.CreateCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromCart.CREATE_CART_SUCCESS,
          payload: cart,
          meta: successMeta(CART_DATA)
        });
      });
    });
  });

  describe('LoadCart Actions', () => {
    describe('LoadCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new fromCart.LoadCart({
          userId: userId,
          cartId: cartId
        });
        expect({ ...action }).toEqual({
          type: fromCart.LOAD_CART,
          payload: { userId: userId, cartId: cartId },
          meta: loadMeta(CART_DATA)
        });
      });
    });

    describe('LoadCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCart.LoadCartFail(error);

        expect({ ...action }).toEqual({
          type: fromCart.LOAD_CART_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error)
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should create the action', () => {
        const action = new fromCart.LoadCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromCart.LOAD_CART_SUCCESS,
          payload: cart,
          meta: successMeta(CART_DATA)
        });
      });
    });
  });

  describe('MergeCart Actions', () => {
    describe('MergeCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new fromCart.MergeCart({
          userId: userId,
          cartId: cartId
        });
        expect({ ...action }).toEqual({
          type: fromCart.MERGE_CART,
          payload: { userId: userId, cartId: cartId }
        });
      });
    });
  });
});
