import * as fromBackInStockAction from '../actions/back-in-stock.actions';
import * as fromBackInStocReducer from './back-in-stock.reducer';

describe('Back In Stock Reducer', () => {
  describe('Undefined Action', () => {
    it('should returen the default state', () => {
      const { initialState } = fromBackInStocReducer;
      const action = {} as fromBackInStockAction.BackInStockAction;

      const state = fromBackInStocReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_BACK_IN_STOCK_SUCCESS action', () => {
    it('should return load status', () => {
      const { initialState } = fromBackInStocReducer;
      const action = new fromBackInStockAction.CreateBackInStockSuccess(
        true
      );

      const state = fromBackInStocReducer.reducer(initialState, action);
      expect(state).toEqual(true);
    });
  });

  describe('DELETE_BACK_IN_STOCK_SUCCESS action', () => {
    it('should return delete status', () => {
      const { initialState } = fromBackInStocReducer;
      const action = new fromBackInStockAction.DeleteBackInStockSuccess(
        true
      );

      const state = fromBackInStocReducer.reducer(initialState, action);
      expect(state).toEqual(false);
    });
  });

  describe('CREATE_BACK_IN_STOCK_SUCCESS action', () => {
    it('should return create status', () => {
      const { initialState } = fromBackInStocReducer;
      const action = new fromBackInStockAction.CreateBackInStockSuccess(
        true
      );

      const state = fromBackInStocReducer.reducer(initialState, action);
      expect(state).toEqual(true);
    });
  });

  describe('RESET_BACK_IN_STOCK action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromBackInStocReducer;
      const action = new fromBackInStockAction.ResetBackInStock( );
      const state = fromBackInStocReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
