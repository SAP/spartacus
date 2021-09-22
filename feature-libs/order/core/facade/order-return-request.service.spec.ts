import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  PROCESS_FEATURE,
  ReturnRequestList,
  StateWithUser,
  UserIdService,
} from '@spartacus/core';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { of, throwError } from 'rxjs';
import { OrderActions } from '../store/actions';
import { ORDER_FEATURE } from '../store/order-state';
import * as fromStoreReducers from '../store/reducers/index';
import { OrderReturnRequestService } from './order-return-request.service';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('OrderReturnRequestService', () => {
  let orderReturnRequestService: OrderReturnRequestService;
  let userIdService: UserIdService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        OrderReturnRequestService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    orderReturnRequestService = TestBed.inject(OrderReturnRequestService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should OrderReturnRequestService is injected', inject(
    [OrderReturnRequestService],
    (service: OrderReturnRequestService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be able to create order return request', () => {
    orderReturnRequestService.createOrderReturnRequest({ orderCode: 'test' });
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.CreateOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestInput: { orderCode: 'test' },
      })
    );
  });

  it('should be able to get an order return request', () => {
    store.dispatch(
      new OrderActions.CreateOrderReturnRequestSuccess({
        rma: '000000',
      })
    );
    orderReturnRequestService
      .getOrderReturnRequest()
      .subscribe((r) => expect(r).toEqual({ rma: '000000' }))
      .unsubscribe();
  });

  it('should be able to load an order return requests data', () => {
    orderReturnRequestService.loadOrderReturnRequestDetail('test');
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.LoadOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestCode: 'test',
      })
    );
  });

  it('should be able to get return requests loading flag', () => {
    store.dispatch(
      new OrderActions.CreateOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestInput: {},
      })
    );
    orderReturnRequestService
      .getReturnRequestLoading()
      .subscribe((r) => expect(r).toBeTruthy())
      .unsubscribe();
  });

  it('should be able to get return requests success flag', () => {
    store.dispatch(
      new OrderActions.CreateOrderReturnRequestSuccess({
        rma: '000000',
      })
    );
    orderReturnRequestService
      .getReturnRequestSuccess()
      .subscribe((r) => expect(r).toBeTruthy())
      .unsubscribe();
  });

  it('should be able to get order return requests list', () => {
    store.dispatch(
      new OrderActions.LoadOrderReturnRequestListSuccess({
        returnRequests: [],
        pagination: {},
        sorts: [],
      })
    );

    let requestList: ReturnRequestList;
    orderReturnRequestService
      .getOrderReturnRequestList(1)
      .subscribe((data) => {
        requestList = data;
      })
      .unsubscribe();
    expect(requestList).toEqual({
      returnRequests: [],
      pagination: {},
      sorts: [],
    });
  });

  it('should be able to load order return requests list', () => {
    orderReturnRequestService.loadOrderReturnRequestList(10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.LoadOrderReturnRequestList({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should NOT load order return requests list when user is anonymous', () => {
    spyOn(userIdService, 'takeUserId').and.callFake(() => {
      return throwError('Error');
    });

    orderReturnRequestService.loadOrderReturnRequestList(10, 1, 'byDate');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should be able to clear order return requests list', () => {
    orderReturnRequestService.clearOrderReturnRequestList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ClearOrderReturnRequestList()
    );
  });

  it('should be able to clear order return requests details', () => {
    orderReturnRequestService.clearOrderReturnRequestDetail();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ClearOrderReturnRequest()
    );
  });

  it('should be able to cancel an order return request', () => {
    orderReturnRequestService.cancelOrderReturnRequest('test', {
      status: 'CANCELLING',
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.CancelOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestCode: 'test',
        returnRequestModification: { status: 'CANCELLING' },
      })
    );
  });

  it('should be able to get CancelReturnRequest loading flag', () => {
    store.dispatch(
      new OrderActions.CancelOrderReturnRequest({
        userId: 'current',
        returnRequestCode: 'test',
        returnRequestModification: {},
      })
    );
    orderReturnRequestService
      .getCancelReturnRequestLoading()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get CancelReturnRequest Success flag', () => {
    store.dispatch(new OrderActions.CancelOrderReturnRequestSuccess());
    orderReturnRequestService
      .getCancelReturnRequestSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to reset CancelReturnRequest process state', () => {
    orderReturnRequestService.resetCancelReturnRequestProcessState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OrderActions.ResetCancelReturnProcess()
    );
  });
});
