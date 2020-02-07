import { Cart } from '../../../model/cart.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'userId';
const cartId = 'xxx';
const customerId = '1234-5678-abcdef';

const testCart: Cart = {
  code: cartId,
  name: 'name',
  description: 'description',
  savedBy: { name: 'user', uid: userId },
};

describe('WishList Actions', () => {
  describe('Load Wish List Actions', () => {
    describe('LoadWishList', () => {
      it('should create the action', () => {
        const payload = { userId, customerId };
        const action = new CartActions.LoadWishList(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST,
          payload,
        });
      });
    });

    describe('LoadWishListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          userId,
        };
        const action = new CartActions.LoadWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            testCart.code
          ),
        });
      });
    });
  });

  describe('Create Wish List Actions', () => {
    describe('CreateWishList', () => {
      it('should create the action', () => {
        const payload = { userId, name: 'name' };
        const action = new CartActions.CreateWishList(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_WISH_LIST,
          payload,
        });
      });
    });

    describe('CreateWishListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          userId,
        };
        const action = new CartActions.CreateWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_WISH_LIST_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            testCart.code
          ),
        });
      });
    });

    describe('CreateWishListFail', () => {
      it('should create the action', () => {
        const payload = { cartId, error: 'error' };
        const action = new CartActions.CreateWishListFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_WISH_LIST_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_FEATURE,
            payload.cartId,
            payload.error
          ),
        });
      });
    });
  });
});
