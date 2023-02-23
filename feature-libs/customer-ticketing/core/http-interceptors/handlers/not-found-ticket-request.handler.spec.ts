import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  RoutingService,
} from '@spartacus/core';
import { NotFoundTicketRequestHandler } from './not-found-ticket-request.handler';

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
  getRouterState() {}
}

describe('NotFoundTicketRequestHandler', () => {
  let service: NotFoundTicketRequestHandler;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotFoundTicketRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    service = TestBed.inject(NotFoundTicketRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);

    spyOn(globalMessageService, 'add');
    spyOn(globalMessageService, 'remove');
    spyOn(routingService, 'go');
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
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'supportTickets',
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'customerTicketingDetails.ticketNotFound' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
