import { Cart } from '../../../model/cart.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { MULTI_CART_DATA } from '../multi-cart-state';
import * as CartActions from './cart.action';

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

const tempCartId = 'tempCartId';

describe('Cart Actions', () => {
  describe('CreateCart Actions', () => {
    describe('CreateCart', () => {
      it('should create the action', () => {
        const payload = { tempCartId, userId: 'userId' };
        const action = new CartActions.CreateCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_DATA,
            tempCartId
          ),
        });
      });
    });

    describe('CreateCartFail', () => {
      it('should create the action', () => {
        const payload = { tempCartId, userId: 'userId', error: 'error' };
        const action = new CartActions.CreateCartFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_DATA,
            tempCartId
          ),
        });
      });
    });

    describe('CreateCartSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart,
          userId: 'userId',
          tempCartId: 'tempCartId',
          cartId: cart.code,
        };
        const action = new CartActions.CreateCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_DATA,
            cart.code
          ),
        });
      });
    });
  });

  describe('LoadCart Actions', () => {
    describe('LoadCart', () => {
      it('should create the action', () => {
        const payload = { cartId: 'testCartId', userId: 'xxx@xxx.xxx' };
        const action = new CartActions.LoadCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_DATA,
            payload.cartId
          ),
        });
      });
    });

    describe('LoadCartFail', () => {
      it('should create the action', () => {
        const payload = { cartId: 'cartId', error: 'error', userId: 'userId' };
        const action = new CartActions.LoadCartFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_DATA,
            payload.cartId,
            payload.error
          ),
        });
      });
    });

    describe('LoadCartSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: cart.code,
          cart,
          userId: 'userId',
        };
        const action = new CartActions.LoadCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CART_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_DATA,
            payload.cart.code
          ),
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
        });
      });
    });

    describe('AddEmailToCartSuccess', () => {
      it('should create the action', () => {
        const action = new CartActions.AddEmailToCartSuccess({
          userId: 'userId',
          cartId: 'cartId',
        });
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART_SUCCESS,
          payload: { userId: 'userId', cartId: 'cartId' },
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
      });
    });
  });
});
