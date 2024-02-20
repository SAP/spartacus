import {
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  OccHttpErrorReason,
  OccHttpErrorType,
  Priority,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { NotFoundTicketRequestHandler } from './not-found-ticket-request.handler';

/** Taken from the constructor argument of `HttpErrorResponse` */
type HttpErrorResponseInit = {
  error?: any;
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
};

const mockRequest = {} as HttpRequest<any>;

const mockRandomResponse = {} as HttpErrorResponse;

const mockTicketNotFoundResponse = {
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

  it('should have a priority of medium', () => {
    expect(service.getPriority()).toEqual(Priority.NORMAL);
  });

  it('should register 404 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.NOT_FOUND);
  });

  it('should not handle response without errors', () => {
    service.handleError(mockRequest, mockRandomResponse);

    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle ticket not found error', () => {
    service.handleError(mockRequest, mockTicketNotFoundResponse);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'supportTickets',
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'customerTicketingDetails.ticketNotFound' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  describe('hasMatch', () => {
    let errorResponseInit: HttpErrorResponseInit;

    describe('when statis is NOT_FOUND', () => {
      beforeEach(() => {
        errorResponseInit = {
          status: 404,
          statusText: 'NOT FOUND',
        };
      });

      describe('when the route is supportTicketDetails', () => {
        beforeEach(() => {
          routingService.getRouterState;
          spyOn(routingService, 'getRouterState').and.returnValue(
            of({
              state: { semanticRoute: 'supportTicketDetails' },
            } as RouterState)
          );
        });

        describe('when the error response contains an error of type notFound', () => {
          beforeEach(() => {
            errorResponseInit.error = {
              errors: [
                {
                  type: OccHttpErrorType.NOT_FOUND_ERROR,
                  reason: OccHttpErrorReason.NOT_FOUND_ERROR,
                } as ErrorModel,
              ],
            };
          });

          it('should match to the error', () => {
            const httpErrorResponse = new HttpErrorResponse(errorResponseInit);

            expect(service.hasMatch(httpErrorResponse)).toBe(true);
          });
        });
      });
    });
  });
});
