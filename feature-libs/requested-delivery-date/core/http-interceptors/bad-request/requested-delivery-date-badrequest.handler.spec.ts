import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
} from '@spartacus/core';
import { RequestedDeliveryDateBadRequestHandler } from './requested-delivery-date-badrequest.handler';

class MockGlobalMessageService {
  add() {}
}

const MockRequest = {} as HttpRequest<any>;

const MockRDDBadRequestResponse = {
  error: {
    errors: [
      {
        message: 'checkout.multi.requestedretrievaldatevalid.error',
        type: 'ValidationError',
      },
    ],
  },
} as HttpErrorResponse;

describe('RequestedDeliveryDateBadRequestHandler', () => {
  let service: RequestedDeliveryDateBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestedDeliveryDateBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(RequestedDeliveryDateBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 400 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_REQUEST);
  });

  it('should handle wrong date bad request', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockRDDBadRequestResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'requestedDeliveryDate.errorMessage',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
