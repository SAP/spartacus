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

  describe('AddEmailToCart Actions', () => {
    describe('AddEmailToCart', () => {
      it('should create the action', () => {
        const userId = 'anonymous';
        const cartId = 'testCartId';
        const email = 'test@test.com';
        const action = new CartActions.AddEmailToCart({
          userId: userId,
          cartId: cartId,
          email: email,
        });
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART,
          payload: { userId: userId, cartId: cartId, email: email },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('AddEmailToCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.AddEmailToCartFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('AddEmailToCartSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.AddEmailToCartSuccess({});
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART_SUCCESS,
          payload: {},
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
    describe('MergeCartSuccess', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new CartActions.MergeCartSuccess({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_CART_SUCCESS,
          payload: { userId, cartId },
        });
      });
    });
  });

  describe('DeleteCart Actions', () => {
    describe('DeleteCart', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new CartActions.DeleteCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: CartActions.DELETE_CART,
          payload: { userId: userId, cartId: cartId },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });
    describe('DeleteCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.DeleteCartFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.DELETE_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });
  });

  describe('ResetCartDetails', () => {
    it('should create the action', () => {
      const action = new CartActions.ResetCartDetails();
      expect({ ...action }).toEqual({
        type: CartActions.RESET_CART_DETAILS,
      });
    });
  });

  describe('ClearCart', () => {
    it('should create the action', () => {
      const action = new CartActions.ClearCart();
      expect({ ...action }).toEqual({
        type: CartActions.CLEAR_CART,
        meta: StateLoaderActions.resetMeta(CART_DATA),
      });
    });
  });
});
