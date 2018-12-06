import { Cart } from '../../../occ-models/index';
import * as fromCart from './../actions/cart.action';

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
          payload: userId
        });
      });
    });

    describe('CreateCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCart.CreateCartFail(error);

        expect({ ...action }).toEqual({
          type: fromCart.CREATE_CART_FAIL,
          payload: error
        });
      });
    });

    describe('CreateCartSuccess', () => {
      it('should create the action', () => {
        const action = new fromCart.CreateCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromCart.CREATE_CART_SUCCESS,
          payload: cart
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
          payload: { userId: userId, cartId: cartId }
        });
      });
    });

    describe('LoadCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCart.LoadCartFail(error);

        expect({ ...action }).toEqual({
          type: fromCart.LOAD_CART_FAIL,
          payload: error
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should create the action', () => {
        const action = new fromCart.LoadCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: fromCart.LOAD_CART_SUCCESS,
          payload: cart
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
