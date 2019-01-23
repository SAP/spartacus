import * as fromCartEntry from './../actions/cart-entry.action';
import { CART_DATA } from '../cart-state';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';

const userId = 'xxx@xxx.xxx';
const cartId = 'testCartId';
const productCode = 'testProductCode';
const entryNumber = 'testEntryNumber';

describe('Cart-entry Actions', () => {
  describe('AddCartEntry Actions', () => {
    describe('AddEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          productCode: productCode,
          quantity: 1
        };
        const action = new fromCartEntry.AddEntry(payload);
        expect({ ...action }).toEqual({
          type: fromCartEntry.ADD_ENTRY,
          payload: payload,
          meta: loadMeta(CART_DATA)
        });
      });
    });

    describe('AddEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCartEntry.AddEntryFail(error);

        expect({ ...action }).toEqual({
          type: fromCartEntry.ADD_ENTRY_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error)
        });
      });
    });

    describe('AddEntrySuccess', () => {
      it('should create the action', () => {
        const action = new fromCartEntry.AddEntrySuccess({});
        expect({ ...action }).toEqual({
          type: fromCartEntry.ADD_ENTRY_SUCCESS,
          payload: {},
          meta: successMeta(CART_DATA)
        });
      });
    });
  });

  describe('RemoveCartEntry Actions', () => {
    describe('RemoveEntry', () => {
      it('should create the action', () => {
        const payload = { userId: userId, cartId: cartId, entry: entryNumber };
        const action = new fromCartEntry.RemoveEntry(payload);
        expect({ ...action }).toEqual({
          type: fromCartEntry.REMOVE_ENTRY,
          payload: payload,
          meta: loadMeta(CART_DATA)
        });
      });
    });

    describe('RemoveEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCartEntry.RemoveEntryFail(error);

        expect({ ...action }).toEqual({
          type: fromCartEntry.REMOVE_ENTRY_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error)
        });
      });
    });

    describe('RemoveEntrySuccess', () => {
      it('should create the action', () => {
        const action = new fromCartEntry.RemoveEntrySuccess();
        expect({ ...action }).toEqual({
          type: fromCartEntry.REMOVE_ENTRY_SUCCESS,
          meta: successMeta(CART_DATA)
        });
      });
    });
  });

  describe('UpdateCartEntry Actions', () => {
    describe('UpdateEntry', () => {
      it('should create the action', () => {
        const payload = {
          userId: userId,
          cartId: cartId,
          productCode: productCode,
          quantity: 1
        };
        const action = new fromCartEntry.UpdateEntry(payload);
        expect({ ...action }).toEqual({
          type: fromCartEntry.UPDATE_ENTRY,
          payload: payload,
          meta: loadMeta(CART_DATA)
        });
      });
    });

    describe('UpdateEntryFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromCartEntry.UpdateEntryFail(error);

        expect({ ...action }).toEqual({
          type: fromCartEntry.UPDATE_ENTRY_FAIL,
          payload: error,
          meta: failMeta(CART_DATA, error)
        });
      });
    });

    describe('UpdateEntrySuccess', () => {
      it('should create the action', () => {
        const action = new fromCartEntry.UpdateEntrySuccess();
        expect({ ...action }).toEqual({
          type: fromCartEntry.UPDATE_ENTRY_SUCCESS,
          meta: successMeta(CART_DATA)
        });
      });
    });
  });
});
