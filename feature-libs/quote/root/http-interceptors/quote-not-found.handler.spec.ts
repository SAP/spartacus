import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  HttpResponseStatus,
  Priority,
  RoutingService,
} from '@spartacus/core';
import { QuoteNotFoundHandler } from './quote-not-found.handler';

const mockRequest = {} as HttpRequest<any>;

const mockQuoteNotFoundResponse = {
  error: {
    errors: [
      {
        message: 'Quote not found',
        type: 'NotFoundError',
      },
    ],
  },
} as HttpErrorResponse;

const mockNotFoundResponse = {
  error: {
    errors: [
      {
        message: 'XX not found',
        type: 'NotFoundError',
      },
    ],
  },
} as HttpErrorResponse;

const mockEmptyResponse = {
  error: null,
} as HttpErrorResponse;

class MockGlobalMessageService {}
class MockRoutingService {
  go() {}
}

describe('QuoteBadRequestHandler', () => {
  let classUnderTest: QuoteNotFoundHandler;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteNotFoundHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });
    classUnderTest = TestBed.inject(QuoteNotFoundHandler);
    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go');
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should register to 404 responseStatus', () => {
    expect(classUnderTest.responseStatus).toEqual(HttpResponseStatus.NOT_FOUND);
  });

  describe('handleError', () => {
    it('should handle quote not found error', () => {
      classUnderTest.handleError(mockRequest, mockQuoteNotFoundResponse);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quotes' });
    });

    it('should do nothing in case error is not related to quote', () => {
      classUnderTest.handleError(mockRequest, mockNotFoundResponse);
      expect(routingService.go).toHaveBeenCalledTimes(0);
    });

    it('should handle empty response', () => {
      classUnderTest.handleError(mockRequest, mockEmptyResponse);
      expect(routingService.go).toHaveBeenCalledTimes(0);
    });
  });

  it('should carry normal priority', () => {
    expect(classUnderTest.getPriority()).toBe(Priority.NORMAL);
  });
});
