import { Cart } from '../../../model/cart.model';
import { StateUtils } from '../../../state/utils/index';
import { getCartIdByUserId, getWishlistName } from '../../utils/utils';
import { MULTI_CART_DATA } from '../multi-cart-state';
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
        const payload = {
          userId,
          customerId,
          tempCartId: getWishlistName(customerId),
        };
        const action = new CartActions.LoadWishList(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST,
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
        const action = new CartActions.LoadWishListSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST_SUCCESS,
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
        const action = new CartActions.LoadWishListFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST_FAIL,
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
          meta: StateUtils.entitySuccessMeta(MULTI_CART_DATA, testCart.code),
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
