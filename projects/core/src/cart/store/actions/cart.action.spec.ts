import { Cart } from '../../../model/cart.model';
import { entityRemoveMeta } from '../../../state/utils/entity/entity.action';
import { StateUtils } from '../../../state/utils/index';
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

const savedCart: Cart = {
  code: 'mock',
};

describe('Cart Actions', () => {
  describe('CreateCart Actions', () => {
    describe('CreateCart', () => {
      it('should create the action', () => {
        const payload = { tempCartId, userId: 'userId' };
        const action = new CartActions.CreateCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_CART,
          payload,
          meta: StateUtils.entityLoadMeta(MULTI_CART_DATA, tempCartId),
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
          meta: StateUtils.entityFailMeta(MULTI_CART_DATA, tempCartId),
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
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, cart.code),
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
          meta: StateUtils.entityLoadMeta(MULTI_CART_DATA, payload.cartId),
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
          meta: StateUtils.entityFailMeta(
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
          meta: StateUtils.entitySuccessMeta(
            MULTI_CART_DATA,
            payload.cart.code
          ),
        });
      });
    });
  });

  describe('LoadCarts Actions', () => {
    describe('LoadCartsSuccess', () => {
      it('should create the action', () => {
        const payload = [savedCart];
        const action = new CartActions.LoadCartsSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_CARTS_SUCCESS,
          payload: [savedCart],
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, [
            payload[0].code as string,
          ]),
        });
      });
    });
  });

  describe('AddEmailToCart Actions', () => {
    describe('AddEmailToCart', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'anonymous',
          cartId: 'testCartId',
          email: 'test@test.com',
        };
        const action = new CartActions.AddEmailToCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART,
          payload,
          meta: StateUtils.entityProcessesIncrementMeta(
            MULTI_CART_DATA,
            payload.cartId
          ),
        });
      });
    });

    describe('AddEmailToCartFail', () => {
      it('should create the action', () => {
        const payload = {
          error: 'anError',
          cartId: 'cartId',
          userId: 'userId',
          email: 'email@email.com',
        };
        const action = new CartActions.AddEmailToCartFail(payload);

        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART_FAIL,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            payload.cartId
          ),
        });
      });
    });

    describe('AddEmailToCartSuccess', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'userId',
          cartId: 'cartId',
          email: 'email@email.com',
        };
        const action = new CartActions.AddEmailToCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_CART_SUCCESS,
          payload,
          meta: StateUtils.entityProcessesDecrementMeta(
            MULTI_CART_DATA,
            payload.cartId
          ),
        });
      });
    });
  });

  describe('MergeCart Actions', () => {
    describe('MergeCart', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'xxx@xxx.xxx',
          cartId: 'testCartId',
          tempCartId: 'tempCartId',
        };
        const action = new CartActions.MergeCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_CART,
          payload,
        });
      });
    });

    describe('MergeCartSuccess', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'xxx@xxx.xxx',
          cartId: 'testCartId',
          oldCartId: 'oldCartId',
          tempCartId: 'tempCartId',
        };
        const action = new CartActions.MergeCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_CART_SUCCESS,
          payload,
          meta: entityRemoveMeta(MULTI_CART_DATA, payload.oldCartId),
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

    describe('DeleteCartSuccess', () => {
      it('should create the action', () => {
        const cartId = 'cartId';
        const userId = 'userId';
        const payload = {
          userId,
          cartId,
        };
        const action = new CartActions.DeleteCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.DELETE_CART_SUCCESS,
          payload,
          meta: entityRemoveMeta(MULTI_CART_DATA, payload.cartId),
        });
      });
    });

    describe('DeleteCartFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const userId = 'xxx@xxx.xxx';
        const cartId = 'testCartId';
        const payload = {
          error,
          userId,
          cartId,
        };
        const action = new CartActions.DeleteCartFail(payload);

        expect({ ...action }).toEqual({
          type: CartActions.DELETE_CART_FAIL,
          payload,
        });
      });
    });
  });

  describe('ResetCartDetails', () => {
    it('should create the action', () => {
      const action = new CartActions.ResetCartDetails();
      expect({ ...action }).toEqual({
        type: CartActions.RESET_CART_DETAILS,
        meta: StateUtils.processesLoaderResetMeta(MULTI_CART_DATA),
      });
    });
  });

  describe('RemoveCart', () => {
    it('should create the action', () => {
      const cartId = 'cartId';
      const action = new CartActions.RemoveCart({ cartId });
      expect({ ...action }).toEqual({
        type: CartActions.REMOVE_CART,
        payload: { cartId },
        meta: entityRemoveMeta(MULTI_CART_DATA, cartId),
      });
    });
  });
});
