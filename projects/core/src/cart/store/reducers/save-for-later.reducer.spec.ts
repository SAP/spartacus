import * as fromActions from './../actions';

import * as fromReducer from './save-for-later.reducer';
import { Cart } from '../../../model/cart.model';

describe('Save for later reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_SAVE_FOR_LATER_SUCCESSS or LOAD_SAVE_FOR_LATER_SUCCESS action', () => {
    it('should create an empty cart', () => {
      const testCart: Cart = {
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
      const { initialState } = fromReducer;

      const action = new fromActions.CreateSaveForLaterSuccess(testCart);
      const state = fromReducer.reducer(initialState, action);

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({});
      expect(state.refresh).toBeFalsy();
    });

    it('should load an existing cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        totalItems: 0,
        entries: [{ entryNumber: 0, product: { code: '1234' } }],
        totalPrice: {
          currencyIso: 'USD',
          value: 0,
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          value: 0,
        },
      };

      const { initialState } = fromReducer;

      const action = new fromActions.LoadSaveForLaterSuccess(testCart);
      const state = fromReducer.reducer(initialState, action);

      delete testCart['entries'];

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } },
      });
      expect(state.refresh).toBeFalsy();
    });
  });

  describe('REMOVE_ENTRY_SUCCESS or ADD_ENTRY_SUCCESS action', () => {
    it('should set refresh to true', () => {
      const { initialState } = fromReducer;

      const action = new fromActions.AddEntrySuccess({});
      const state = fromReducer.reducer(initialState, action);
      expect(state.refresh).toBeTruthy();
    });
  });
});
