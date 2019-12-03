import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { PaginationModel, SortModel } from '../../../model/misc.model';
import { UserActions } from '../actions/index';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';

describe('Order Return Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { returnRequestInitialState } = fromOrderReturnRequestReducer;
      const action = {} as UserActions.OrderReturnRequestAction;
      const state = fromOrderReturnRequestReducer.returnRequestReducer(
        undefined,
        action
      );

      expect(state).toBe(returnRequestInitialState);
    });
  });

  describe('CREATE_ORDER_RETURN_REQUEST_SUCCESS action', () => {
    it('should populate the order return request state', () => {
      const mockReturnRequest: ReturnRequest = { rma: '123' };

      const { returnRequestInitialState } = fromOrderReturnRequestReducer;
      const action = new UserActions.CreateOrderReturnRequestSuccess(
        mockReturnRequest
      );
      const state = fromOrderReturnRequestReducer.returnRequestReducer(
        returnRequestInitialState,
        action
      );

      expect(state).toEqual(mockReturnRequest);
    });
  });

  describe('LOAD_ORDER_RETURN_REQUESTS_SUCCESS action', () => {
    it('should populate the user Orders state entities', () => {
      const returnRequests: ReturnRequest[] = [{ rma: '01' }, { rma: '02' }];
      const pagination: PaginationModel = {
        currentPage: 1,
        totalPages: 5,
        pageSize: 5,
      };
      const sorts: SortModel[] = [{ code: 'byDate' }];
      const mockUserOrders: ReturnRequestList = {
        returnRequests,
        pagination,
        sorts,
      };

      const { returnRequestListInitialState } = fromOrderReturnRequestReducer;
      const action = new UserActions.LoadOrderReturnRequestListSuccess(
        mockUserOrders
      );
      const state = fromOrderReturnRequestReducer.returnRequestListReducer(
        returnRequestListInitialState,
        action
      );

      expect(state).toEqual(mockUserOrders);
    });
  });
});
