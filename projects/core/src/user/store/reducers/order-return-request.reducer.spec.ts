import { ReturnRequest } from '../../../model/order.model';
import { UserActions } from '../actions/index';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';

describe('Order Return Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrderReturnRequestReducer;
      const action = {} as UserActions.OrderReturnRequestAction;
      const state = fromOrderReturnRequestReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_ORDER_RETURN_REQUEST_SUCCESS action', () => {
    it('should populate the order return request state', () => {
      const mockReturnRequest: ReturnRequest = { rma: '123' };

      const { initialState } = fromOrderReturnRequestReducer;
      const action = new UserActions.CreateOrderReturnRequestSuccess(
        mockReturnRequest
      );
      const state = fromOrderReturnRequestReducer.reducer(initialState, action);

      expect(state.returnRequest).toEqual(mockReturnRequest);
    });
  });
});
