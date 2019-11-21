import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { ReturnRequestList } from '../../model/order.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { OrderReturnRequestService } from './order-return-request.service';

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
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
      ],
      providers: [
        OrderReturnRequestService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithUser>>);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(OrderReturnRequestService as Type<
      OrderReturnRequestService
    >);
  });

  it('should OrderReturnRequestService is injected', inject(
    [OrderReturnRequestService],
    (orderReturnRequestService: OrderReturnRequestService) => {
      expect(orderReturnRequestService).toBeTruthy();
    }
  ));

  it('should be able to create order return request', () => {
    service.createOrderReturnRequest('orderCode', {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.CreateOrderReturnRequest({
        userId: OCC_USER_ID_CURRENT,
        orderCode: 'orderCode',
        returnRequestInput: {},
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
      .subscribe(r => expect(r).toEqual({ rma: '000000' }))
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
      .subscribe(data => {
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
});
