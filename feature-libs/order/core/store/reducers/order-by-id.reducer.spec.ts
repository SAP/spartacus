import { Order } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';
import * as fromTrackingReducer from './order-by-id.reducer';
const { initialStateOfOrderById } = fromTrackingReducer;
const mockOrder: Order = {
  code: '1234567890',
  status: 'shipped',
};
describe('Order By Id Reducer', () => {
  describe('for undefined action', () => {
    it('should return the default state', () => {
      const action = {} as OrderActions.OrderByIdAction;
      const state = fromTrackingReducer.reducer(undefined, action);
      expect(state).toBe(initialStateOfOrderById);
    });
  });

  describe('for LOAD_ORDER_BY_ID_SUCCESS action', () => {
    it('should populate the order details state entities', () => {
      const action = new OrderActions.LoadOrderByIdSuccess(mockOrder);
      const state = fromTrackingReducer.reducer(
        initialStateOfOrderById,
        action
      );
      expect(state).toEqual(mockOrder);
    });
  });

  describe('for LOAD_ORDER_BY_ID_FAIL action', () => {
    it('should return the default state', () => {
      const action = new OrderActions.LoadOrderByIdFail({
        code: 'order1',
        error: 'there is error',
      });
      const state = fromTrackingReducer.reducer(
        initialStateOfOrderById,
        action
      );
      expect(state).toEqual(initialStateOfOrderById);
    });
  });
});
