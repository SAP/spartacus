import {
  StateLoaderActions,
  StateEntityLoaderActions,
} from '../../../state/utils/index';
import { CART_DATA, ADD_ENTRY_PROCESS_ID } from '../cart-state';
import { CartActions } from './index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

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
        const action = new CartActions.CartAddEntrySuccess({});
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRY_SUCCESS,
          payload: {},
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
        const action = new CartActions.CartRemoveEntrySuccess({});
        expect({ ...action }).toEqual({
          type: CartActions.CART_REMOVE_ENTRY_SUCCESS,
          payload: {},
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
          productCode: productCode,
          quantity: 1,
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
        const action = new CartActions.CartUpdateEntrySuccess({});
        expect({ ...action }).toEqual({
          type: CartActions.CART_UPDATE_ENTRY_SUCCESS,
          payload: {},
          meta: StateLoaderActions.successMeta(CART_DATA),
        });
      });
    });
  });

  describe('AddCartEntries Actions', () => {
    describe('CartAddEntries', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          products: [{ productCode, quantity: 1 }],
        };
        const action = new CartActions.CartAddEntries(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRIES,
          payload,
        });
      });
    });

    describe('CartAddEntriesFail', () => {
      it('should create the action', () => {
        const payload = {
          error: 'error',
        };
        const action = new CartActions.CartAddEntriesFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRIES_FAIL,
          payload,
        });
      });
    });

    describe('CartAddEntriesSuccess', () => {
      it('should create the action', () => {
        const payload = {};
        const action = new CartActions.CartAddEntriesSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CART_ADD_ENTRIES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('AddEntryProcess Actions', () => {
    describe('CartStartAddEntryProcess', () => {
      it('should create the action', () => {
        const action = new CartActions.CartStartAddEntryProcess();
        expect({ ...action }).toEqual({
          type: CartActions.CART_START_ADD_ENTRY_PROCESS,
          meta: StateEntityLoaderActions.entityLoadMeta(
            PROCESS_FEATURE,
            ADD_ENTRY_PROCESS_ID
          ),
        });
      });
    });

    describe('CartSuccessAddEntryProcess', () => {
      it('should create the action', () => {
        const action = new CartActions.CartSuccessAddEntryProcess();
        expect({ ...action }).toEqual({
          type: CartActions.CART_SUCCESS_ADD_ENTRY_PROCESS,
          payload: undefined,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            PROCESS_FEATURE,
            ADD_ENTRY_PROCESS_ID
          ),
        });
      });
    });

    describe('CartFailAddEntryProcess', () => {
      it('should create the action', () => {
        const action = new CartActions.CartFailAddEntryProcess();
        expect({ ...action }).toEqual({
          type: CartActions.CART_FAIL_ADD_ENTRY_PROCESS,
          meta: StateEntityLoaderActions.entityFailMeta(
            PROCESS_FEATURE,
            ADD_ENTRY_PROCESS_ID
          ),
        });
      });
    });
  });
});
