import { Cart } from '../../../model/cart.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';
import * as DeprecatedCartActions from './cart.action';

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
        const action = new DeprecatedCartActions.CreateCart(userId);
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.CREATE_CART,
          payload: userId,
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('CreateCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new DeprecatedCartActions.CreateCartFail(error);

        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.CREATE_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('CreateCartSuccess', () => {
      it('should create the action', () => {
        const action = new DeprecatedCartActions.CreateCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.CREATE_CART_SUCCESS,
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
        const action = new DeprecatedCartActions.LoadCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.LOAD_CART,
          payload: { userId: userId, cartId: cartId },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('LoadCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new DeprecatedCartActions.LoadCartFail(error);

        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.LOAD_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should create the action', () => {
        const action = new DeprecatedCartActions.LoadCartSuccess(cart);
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.LOAD_CART_SUCCESS,
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
        const action = new DeprecatedCartActions.AddEmailToCart({
          userId: userId,
          cartId: cartId,
          email: email,
        });
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.ADD_EMAIL_TO_CART,
          payload: { userId: userId, cartId: cartId, email: email },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('AddEmailToCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new DeprecatedCartActions.AddEmailToCartFail(error);

        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.ADD_EMAIL_TO_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('AddEmailToCartSuccess', () => {
      it('should create the action', () => {
        const action = new DeprecatedCartActions.AddEmailToCartSuccess({});
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.ADD_EMAIL_TO_CART_SUCCESS,
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
        const action = new DeprecatedCartActions.MergeCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.MERGE_CART,
          payload: { userId: userId, cartId: cartId },
        });
      });
    });
    describe('MergeCartSuccess', () => {
      it('should create the action', () => {
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const action = new DeprecatedCartActions.MergeCartSuccess({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.MERGE_CART_SUCCESS,
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
        const action = new DeprecatedCartActions.DeleteCart({
          userId: userId,
          cartId: cartId,
        });
        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.DELETE_CART,
          payload: { userId: userId, cartId: cartId },
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });
    describe('DeleteCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new DeprecatedCartActions.DeleteCartFail(error);

        expect({ ...action }).toEqual({
          type: DeprecatedCartActions.DELETE_CART_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });
  });

  describe('ResetCartDetails', () => {
    it('should create the action', () => {
      const action = new DeprecatedCartActions.ResetCartDetails();
      expect({ ...action }).toEqual({
        type: DeprecatedCartActions.RESET_CART_DETAILS,
      });
    });
  });

  describe('ClearCart', () => {
    it('should create the action', () => {
      const action = new DeprecatedCartActions.ClearCart();
      expect({ ...action }).toEqual({
        type: DeprecatedCartActions.CLEAR_CART,
        meta: StateLoaderActions.resetMeta(CART_DATA),
      });
    });
  });
});
