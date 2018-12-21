import * as fromCart from './cart.reducer';
import * as fromActions from './../actions';
import { Cart } from '@spartacus/core';

describe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCart;
      const action = {} as any;
      const state = fromCart.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_CART_SUCCESSS or LOAD_CART_SUCCESS action', () => {
    it('should create an empty cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        totalItems: 0,
        totalPrice: {
          currencyIso: 'USD',
          value: 0
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          value: 0
        }
      };
      const { initialState } = fromCart;

      const action = new fromActions.CreateCartSuccess(testCart);
      const state = fromCart.reducer(initialState, action);

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({});
      expect(state.refresh).toEqual(false);
      expect(state.loaded).toEqual(true);
    });

    it('should load an existing cart', () => {
      const testCart: Cart = {
        code: 'xxx',
        guid: 'xxx',
        totalItems: 0,
        entries: [{ entryNumber: 0, product: { code: '1234' } }],
        totalPrice: {
          currencyIso: 'USD',
          value: 0
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          value: 0
        }
      };

      const { initialState } = fromCart;

      const action = new fromActions.LoadCartSuccess(testCart);
      const state = fromCart.reducer(initialState, action);

      delete testCart['entries'];

      expect(state.content).toEqual(testCart);
      expect(state.entries).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } }
      });
      expect(state.refresh).toEqual(false);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('REMOVE_ENTRY_SUCCESS or ADD_ENTRY_SUCCESS action', () => {
    it('should set refresh to true', () => {
      const { initialState } = fromCart;

      const action = new fromActions.AddEntrySuccess({});
      const state = fromCart.reducer(initialState, action);
      expect(state.refresh).toEqual(true);
    });
  });

  describe('REMOVE_ENTRY', () => {
    it('should set loaded to false', () => {
      const { initialState } = fromCart;
      const action = new fromActions.RemoveEntry({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('ADD_ENTRY', () => {
    it('should set loaded to false', () => {
      const { initialState } = fromCart;
      const action = new fromActions.AddEntry({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('UPDATE_ENTRY', () => {
    it('should set loaded to false', () => {
      const { initialState } = fromCart;
      const action = new fromActions.UpdateEntry({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('LOAD_CART', () => {
    it('should set loaded to false', () => {
      const { initialState } = fromCart;
      const action = new fromActions.LoadCart({ userId: '', cartId: '' });
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('CREATE_CART', () => {
    it('should set loaded to false', () => {
      const { initialState } = fromCart;
      const action = new fromActions.CreateCart({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('LOAD_CART_SUCCESS', () => {
    it('should set loaded to true', () => {
      const { initialState } = fromCart;
      const action = new fromActions.LoadCartSuccess({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('CREATE_CART_SUCCESS', () => {
    it('should set loaded to true', () => {
      const { initialState } = fromCart;
      const action = new fromActions.CreateCartSuccess({});
      const state = fromCart.reducer(initialState, action);
      expect(state.loaded).toEqual(true);
    });
  });
});
