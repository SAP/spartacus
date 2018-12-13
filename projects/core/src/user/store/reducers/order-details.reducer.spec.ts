import * as fromOrderDetailsAction from '../actions/order-details.action';
import * as fromOrderDetailsReducer from './order-details.reducer';
import { Order } from '../../../occ/occ-models/index';

describe('Order Details Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrderDetailsReducer;
      const action = {} as any;
      const state = fromOrderDetailsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ORDER_DETAILS_SUCCESS action', () => {
    it('should populate the order details state entities', () => {
      const mockOrderDetails: Order = { code: '123' };

      const { initialState } = fromOrderDetailsReducer;
      const action = new fromOrderDetailsAction.LoadOrderDetailsSuccess(
        mockOrderDetails
      );
      const state = fromOrderDetailsReducer.reducer(initialState, action);

      expect(state.order).toEqual(mockOrderDetails);
    });
  });
});
