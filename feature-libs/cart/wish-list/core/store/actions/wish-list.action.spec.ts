import { MULTI_CART_DATA } from '@spartacus/cart/base/core';
import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { WishListActions } from './index';

const userId = 'userId';
const cartId = 'testWishListId';

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
        const payload = {
          userId,
          cartId,
        };
        const action = new WishListActions.LoadWishList(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.LOAD_WISH_LIST,
          payload,
          meta: StateUtils.entityLoadMeta(MULTI_CART_DATA, 'testWishListId'),
        });
      });
    });

    describe('LoadWishListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          cartId,
        };
        const action = new WishListActions.LoadWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.LOAD_WISH_LIST_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, 'testWishListId'),
        });
      });
    });

    describe('LoadWishListFail', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId,
          error: { message:"anyError" },
        };
        const action = new WishListActions.LoadWishListFail(payload);
        expect({ ...action }).toEqual({
          error: payload.error,
          type: WishListActions.LOAD_WISH_LIST_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(MULTI_CART_DATA, cartId, 'anyError'),
        });
      });
    });
  });

  describe('Create Wish List Actions', () => {
    describe('CreateWishList', () => {
      it('should create the action', () => {
        const payload = { userId, name: 'name' };
        const action = new WishListActions.CreateWishList(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.CREATE_WISH_LIST,
          payload,
        });
      });
    });

    describe('CreateWishListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          cartId,
        };
        const action = new WishListActions.CreateWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.CREATE_WISH_LIST_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, cartId),
        });
      });
    });

    describe('CreateWishListFail', () => {
      it('should create the action', () => {
        const payload = { cartId, error: { message:"error" } };
        const action = new WishListActions.CreateWishListFail(payload);
        expect({ ...action }).toEqual({
          error: payload.error,
          type: WishListActions.CREATE_WISH_LIST_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(
            MULTI_CART_DATA,
            payload.cartId,
            payload.error
          ),
        });
      });
    });
  });
});
