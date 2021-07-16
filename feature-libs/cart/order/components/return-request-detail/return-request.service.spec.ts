import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  OrderReturnRequestService,
  ReturnRequest,
  RoutingService,
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
  go = jasmine.createSpy('go');
  getRouterState() {
    return of(router);
  }
}

const mockReturnRequest: ReturnRequest = { rma: '123456', returnEntries: [] };
class MockOrderReturnRequestService {
  clearOrderReturnRequestDetail = jasmine.createSpy();
  loadOrderReturnRequestDetail = jasmine.createSpy();
  cancelOrderReturnRequest = jasmine.createSpy();
  resetCancelReturnRequestProcessState = jasmine.createSpy();
  getOrderReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  getReturnRequestLoading(): Observable<boolean> {
    return of(false);
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

describe('ReturnRequestService', () => {
  let service;
  let orderReturnRequestService: OrderReturnRequestService;
  let routingService: RoutingService;
  let messageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ReturnRequestService,
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    service = TestBed.inject(ReturnRequestService);
    orderReturnRequestService = TestBed.inject(OrderReturnRequestService);
    routingService = TestBed.inject(RoutingService);
    messageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to fetch return request data', () => {
    let result: ReturnRequest;
    service
      .getReturnRequest()
      .subscribe((returnRequest) => (result = returnRequest));
    expect(result).toEqual(mockReturnRequest);
  });

  it('should load return request data if return request data not exist', () => {
    spyOn(orderReturnRequestService, 'getOrderReturnRequest').and.returnValue(
      of(undefined)
    );
    service.getReturnRequest().subscribe().unsubscribe();
    expect(
      orderReturnRequestService.loadOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });

  it('should load return request data if rma is not equal to returnCode in route parameter', () => {
    spyOn(orderReturnRequestService, 'getOrderReturnRequest').and.returnValue(
      of({ rma: '1111', returnEntries: [] })
    );
    service.getReturnRequest().subscribe().unsubscribe();
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
    service.getReturnRequest().subscribe().unsubscribe();
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

  it('should be able to cancel return request', () => {
    service.cancelReturnRequest('test');
    expect(
      orderReturnRequestService.cancelOrderReturnRequest
    ).toHaveBeenCalledWith('test', {
      status: 'CANCELLING',
    });
  });

  it('should add global message and redirect to order history page after cancel success', () => {
    service.cancelSuccess('1');
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orders',
    });
    expect(messageService.add).toHaveBeenCalledWith(
      {
        key: 'returnRequest.cancelSuccess',
        params: { rma: '1' },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should be able to back to return request list page', () => {
    service.backToList();
    expect(routingService.go).toHaveBeenCalledWith(
      { cxRoute: 'orders' },
      {
        state: {
          activeTab: 1,
        },
      }
    );
  });
});
