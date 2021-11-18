import { getCartIdByUserId, MULTI_CART_DATA } from '@spartacus/cart/main/core';
import { Cart } from '@spartacus/cart/main/root';
import { StateUtils } from '@spartacus/core';
import { getWishlistName } from '../../utils/utils';
import { WishListActions } from './index';

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
        const payload = {
          userId,
          customerId,
          tempCartId: getWishlistName(customerId),
        };
        const action = new WishListActions.LoadWishList(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.LOAD_WISH_LIST,
          payload,
          meta: StateUtils.entityLoadMeta(MULTI_CART_DATA, payload.tempCartId),
        });
      });
    });

    describe('LoadWishListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          userId,
          cartId: getCartIdByUserId(testCart, userId),
        };
        const action = new WishListActions.LoadWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.LOAD_WISH_LIST_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, testCart.code),
        });
      });
    });

    describe('LoadWishListFail', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId: getCartIdByUserId(testCart, userId),
          error: 'anyError',
        };
        const action = new WishListActions.LoadWishListFail(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.LOAD_WISH_LIST_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(
            MULTI_CART_DATA,
            testCart.code,
            'anyError'
          ),
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
          userId,
        };
        const action = new WishListActions.CreateWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: WishListActions.CREATE_WISH_LIST_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, testCart.code),
        });
      });
    });

    describe('CreateWishListFail', () => {
      it('should create the action', () => {
        const payload = { cartId, error: 'error' };
        const action = new WishListActions.CreateWishListFail(payload);
        expect({ ...action }).toEqual({
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
