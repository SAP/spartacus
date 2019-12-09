import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
  GlobalMessageService,
  GlobalMessageType,
  LoaderState,
} from '@spartacus/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
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

const mockReturnRequest: ReturnRequest = { rma: 'test', returnEntries: [] };
const returnRequestState: BehaviorSubject<
  LoaderState<ReturnRequest>
> = new BehaviorSubject({});
class MockOrderReturnRequestService {
  clearOrderReturnRequestDetail = jasmine.createSpy();
  cancelOrderReturnRequest = jasmine.createSpy();
  getOrderReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  getReturnRequestState() {
    return returnRequestState;
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

describe('ReturnRequestService', () => {
  let service;
  let orderReturnRequestService: MockOrderReturnRequestService;
  let routingService: MockRoutingService;
  let messageService: MockGlobalMessageService;

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

    service = TestBed.get(ReturnRequestService as Type<ReturnRequestService>);
    orderReturnRequestService = TestBed.get(OrderReturnRequestService as Type<
      OrderReturnRequestService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    messageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to fetch return request data', () => {
    let result: ReturnRequest;
    service
      .getReturnRequest()
      .subscribe(returnRequest => (result = returnRequest));
    expect(result).toEqual(mockReturnRequest);
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
    returnRequestState.next({
      loading: false,
      error: false,
      success: true,
      value: { rma: '1' },
    });
    service.isCancelling$.subscribe().unsubscribe();
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

  it('should do nothing when cancelling', () => {
    returnRequestState.next({
      loading: true,
      error: false,
      success: false,
      value: { rma: '1' },
    });
    service.isCancelling$.subscribe().unsubscribe();

    expect(routingService.go).not.toHaveBeenCalledWith({
      cxRoute: 'orders',
    });
  });
});
