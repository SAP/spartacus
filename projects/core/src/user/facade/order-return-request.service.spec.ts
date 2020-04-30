import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../../auth/facade/auth.service';
import { ReturnRequestList } from '../../model/order.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { OrderReturnRequestService } from './order-return-request.service';

class MockAuthService {
  invokeWithUserId(cb) {
    cb(OCC_USER_ID_CURRENT);
  }
}

describe('OrderReturnRequestService', () => {
  let service: OrderReturnRequestService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        OrderReturnRequestService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(OrderReturnRequestService);
  });

  it('should OrderReturnRequestService is injected', inject(
    [OrderReturnRequestService],
    (orderReturnRequestService: OrderReturnRequestService) => {
      expect(orderReturnRequestService).toBeTruthy();
    }
  ));

  it('should be able to create order return request', () => {
    service.createOrderReturnRequest({ orderCode: 'test' });
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.CreateOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestInput: { orderCode: 'test' },
      })
    );
  });

  it('should be able to get an order return request', () => {
    store.dispatch(
      new UserActions.CreateOrderReturnRequestSuccess({
        rma: '000000',
      })
    );
    service
      .getOrderReturnRequest()
      .subscribe((r) => expect(r).toEqual({ rma: '000000' }))
      .unsubscribe();
  });

  it('should be able to load an order return requests data', () => {
    service.loadOrderReturnRequestDetail('test');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestCode: 'test',
      })
    );
  });

  it('should be able to get return requests loading flag', () => {
    store.dispatch(
      new UserActions.CreateOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestInput: {},
      })
    );
    service
      .getReturnRequestLoading()
      .subscribe((r) => expect(r).toBeTruthy())
      .unsubscribe();
  });

  it('should be able to get return requests success flag', () => {
    store.dispatch(
      new UserActions.CreateOrderReturnRequestSuccess({
        rma: '000000',
      })
    );
    service
      .getReturnRequestSuccess()
      .subscribe((r) => expect(r).toBeTruthy())
      .unsubscribe();
  });

  it('should be able to get order return requests list', () => {
    store.dispatch(
      new UserActions.LoadOrderReturnRequestListSuccess({
        returnRequests: [],
        pagination: {},
        sorts: [],
      })
    );

    let requestList: ReturnRequestList;
    service
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
    service.loadOrderReturnRequestList(10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadOrderReturnRequestList({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should be able to clear order return requests list', () => {
    service.clearOrderReturnRequestList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearOrderReturnRequestList()
    );
  });

  it('should be able to clear order return requests details', () => {
    service.clearOrderReturnRequestDetail();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearOrderReturnRequest()
    );
  });

  it('should be able to cancel an order return request', () => {
    service.cancelOrderReturnRequest('test', { status: 'CANCELLING' });
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.CancelOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        returnRequestCode: 'test',
        returnRequestModification: { status: 'CANCELLING' },
      })
    );
  });

  it('should be able to get CancelReturnRequest loading flag', () => {
    store.dispatch(
      new UserActions.CancelOrderReturnRequest({
        userId: 'current',
        returnRequestCode: 'test',
        returnRequestModification: {},
      })
    );
    service
      .getCancelReturnRequestLoading()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get CancelReturnRequest Success flag', () => {
    store.dispatch(new UserActions.CancelOrderReturnRequestSuccess());
    service
      .getCancelReturnRequestSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to reset CancelReturnRequest process state', () => {
    service.resetCancelReturnRequestProcessState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetCancelReturnProcess()
    );
  });
});
