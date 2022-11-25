import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  RoutingService,
} from '@spartacus/core';
import { BadTicketRequestHandler } from './bad-ticket-request.handler';

const MockRequest = {} as HttpRequest<any>;

const MockRandomResponse = {} as HttpErrorResponse;

const MockTicketNotFoundResponse = {
  error: {
    errors: [
      {
        type: 'NotFoundError',
        message: 'Ticket not found for the given ID XYZ12345',
        reason: 'notFound',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

class MockRoutingService {
  go() {}
}

describe('BadTicketRequestHandler', () => {
  let service: BadTicketRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadTicketRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    service = TestBed.inject(BadTicketRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add');
    spyOn(globalMessageService, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 404 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.NOT_FOUND);
  });

  it('should not handle response without errors', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle ticket not found error', () => {
    service.handleError(MockRequest, MockTicketNotFoundResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.ticketNotFound' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
