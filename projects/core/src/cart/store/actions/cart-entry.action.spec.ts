import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';
import { CartActions } from './index';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const productCode = 'testProductCode';
const entryNumber = 'testEntryNumber';

describe('Cart-entry Actions', () => {
  describe('AddCartEntry Actions', () => {
    describe('CartAddEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          productCode: productCode,
          quantity: 1,
        };
        const action = new CartActions.CartAddEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY,
          payload: payload,
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('CartAddEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CartAddEntryFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('CartAddEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: 'cartId',
          userId: 'userId',
        };
        const action = new CartActions.CartAddEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY_SUCCESS,
          payload,
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });

  describe('RemoveCartEntry Actions', () => {
    describe('CartRemoveEntry', () => {
      it('should create the action', () => {
        const payload = { userId: userId, cartId: cartId, entry: entryNumber };
        const action = new CartActions.CartRemoveEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY,
          payload: payload,
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('CartRemoveEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CartRemoveEntryFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('CartRemoveEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'userId',
          cartId: 'cartId',
        };
        const action = new CartActions.CartRemoveEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY_SUCCESS,
          payload,
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });

  describe('UpdateCartEntry Actions', () => {
    describe('CartUpdateEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          entry: productCode,
          qty: 1,
        };
        const action = new CartActions.CartUpdateEntry(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY,
          payload: payload,
          meta: StateLoaderActions.loadMeta(CART_DATA),
        });
      });
    });

    describe('CartUpdateEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CartActions.CartUpdateEntryFail(error);

        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CART_DATA, error),
        });
      });
    });

    describe('CartUpdateEntrySuccess', () => {
      it('should create the action', () => {
        const payload = {
          cartId: 'cartId',
          userId: 'userId',
        };
        const action = new CartActions.CartUpdateEntrySuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY_SUCCESS,
          payload,
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });
});
