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
  status: HttpResponseStatus.NOT_FOUND,
  error: {
    errors: [
      {
        message: 'Quote not found',
        type: 'NotFoundError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteNotFoundResponseWoMessages = {
  status: HttpResponseStatus.NOT_FOUND,
} as HttpErrorResponse;

const mockNotFoundResponse = {
  status: HttpResponseStatus.NOT_FOUND,
  error: {
    errors: [
      {
        message: 'XX not found',
        type: 'NotFoundError',
      },
    ],
  },
} as HttpErrorResponse;

const mockBadRequestResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
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
    it('should trigger navigation', () => {
      classUnderTest.handleError(mockRequest);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quotes' });
    });
  });

  describe('hasMatch', () => {
    it('should detect quote issues', () => {
      expect(classUnderTest.hasMatch(mockQuoteNotFoundResponse)).toBe(true);
    });

    it('should know that it is not responsible for 400', () => {
      expect(classUnderTest.hasMatch(mockBadRequestResponse)).toBe(false);
    });

    it('should know that it is not responsible for non-quote 404 issues', () => {
      expect(classUnderTest.hasMatch(mockNotFoundResponse)).toBe(false);
    });

    it('should know that it is not responsible in case no messages are present', () => {
      expect(classUnderTest.hasMatch(mockQuoteNotFoundResponseWoMessages)).toBe(
        false
      );
    });
  });

  it('should carry normal priority', () => {
    expect(classUnderTest.getPriority()).toBe(Priority.NORMAL);
  });
});
