import { Cart } from '../../../model/cart.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import { CartActions } from './index';

const userId = 'userId';
const cartId = 'xxx';

const testCart: Cart = {
  code: cartId,
  name: 'name',
  description: 'description',
  savedBy: { name: 'user', uid: userId },
};

describe('WishList Actions', () => {
  describe('Load Wish List Actions', () => {
    describe('LoadWisthList', () => {
      it('should create the action', () => {
        const payload = userId;
        const action = new CartActions.LoadWisthList(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_WISH_LIST,
          payload,
        });
      });
    });

    describe('LoadWisthListSuccess', () => {
      it('should create the action', () => {
        const payload = {
          cart: testCart,
          userId,
        };
        const action = new CartActions.LoadWisthListSuccess(payload);
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
    describe('CreateWisthList', () => {
      it('should create the action', () => {
        const payload = { userId, name: 'name' };
        const action = new CartActions.CreateWishList(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_WISH_LIST,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            'fresh'
          ),
        });
      });
    });

    describe('CreateWisthListSuccess', () => {
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

    describe('CreateWisthListFail', () => {
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

    describe('ResetWishListDetails', () => {
      it('should create the action', () => {
        const action = new CartActions.ResetWishListDetails();
        expect({ ...action }).toEqual({
          type: CartActions.RESET_WISH_LIST_DETAILS,
          meta: StateEntityLoaderActions.entityResetMeta(
            MULTI_CART_FEATURE,
            undefined
          ),
        });
      });
    });
  });
});
