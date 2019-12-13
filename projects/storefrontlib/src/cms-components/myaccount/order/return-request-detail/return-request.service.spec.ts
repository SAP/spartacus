import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ReturnRequestService } from './return-request.service';

const router = {
  state: {
    url: '/',
    params: { returnCode: '123456' },
  },
};

class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

const mockReturnRequest: ReturnRequest = { rma: '123456', returnEntries: [] };

class MockOrderReturnRequestService {
  clearOrderReturnRequestDetail = jasmine.createSpy();
  loadOrderReturnRequestDetail = jasmine.createSpy();
  getOrderReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  getReturnRequestLoading(): Observable<boolean> {
    return of(false);
  }
}

describe('ReturnRequestService', () => {
  let service;
  let orderReturnRequestService: MockOrderReturnRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ReturnRequestService,
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.get(ReturnRequestService as Type<ReturnRequestService>);
    orderReturnRequestService = TestBed.get(OrderReturnRequestService as Type<
      OrderReturnRequestService
    >);
  });

  it('should be able to fetch return request data', () => {
    let result: ReturnRequest;
    service
      .getReturnRequest()
      .subscribe(returnRequest => (result = returnRequest));
    expect(result).toEqual(mockReturnRequest);
  });

  it('should load return request data if return request data not exist', () => {
    spyOn(orderReturnRequestService, 'getOrderReturnRequest').and.returnValue(
      of(undefined)
    );
    service
      .getReturnRequest()
      .subscribe()
      .unsubscribe();
    expect(
      orderReturnRequestService.loadOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });

  it('should load return request data if rma is not equal to returnCode in route parameter', () => {
    spyOn(orderReturnRequestService, 'getOrderReturnRequest').and.returnValue(
      of({ rma: '1111', returnEntries: [] })
    );
    service
      .getReturnRequest()
      .subscribe()
      .unsubscribe();
    expect(
      orderReturnRequestService.loadOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });

  it('should NOT load return request data if loading is true', () => {
    spyOn(orderReturnRequestService, 'getOrderReturnRequest').and.returnValue(
      of(undefined)
    );
    spyOn(orderReturnRequestService, 'getReturnRequestLoading').and.returnValue(
      of(true)
    );
    service
      .getReturnRequest()
      .subscribe()
      .unsubscribe();
    expect(
      orderReturnRequestService.loadOrderReturnRequestDetail
    ).not.toHaveBeenCalled();
  });

  it('should be able to clear return request data', () => {
    service.clearReturnRequest();
    expect(
      orderReturnRequestService.clearOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });
});
