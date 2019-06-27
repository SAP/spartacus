import { Cart } from '../../../model/cart.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';
import { CartActions } from './index';

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

describe('Cart Actions', () => {
  describe('CreateCart Actions', () => {
    describe('CreateCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const action = new CartActions.CreateCart(userId);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART,
          payload: userId,
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('CreateCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CreateCartFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('CreateCartSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.CreateCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART_SUCCESS,
          payload: cart,
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });

  describe('LoadCart Actions', () => {
    describe('LoadCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new CartActions.LoadCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART,
          payload: { userId: userId, cartId: cartId },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('LoadCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.LoadCartFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.LoadCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART_SUCCESS,
          payload: cart,
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });

  describe('MergeCart Actions', () => {
    describe('MergeCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new CartActions.MergeCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_CART,
          payload: { userId: userId, cartId: cartId },
        });
      });
    });
  });
});
