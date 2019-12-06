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

const mockReturnRequest: ReturnRequest = { rma: 'test', returnEntries: [] };

class MockOrderReturnRequestService {
  clearOrderReturnRequestDetail = jasmine.createSpy();
  getOrderReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
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

  it('should be able to clear return request data', () => {
    service.clearReturnRequest();
    expect(
      orderReturnRequestService.clearOrderReturnRequestDetail
    ).toHaveBeenCalled();
  });
});
