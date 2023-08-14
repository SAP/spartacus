import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  HttpResponseStatus,
  GlobalMessageType,
  Priority,
} from '@spartacus/core';
import { QuoteBadRequestHandler } from './quote-bad-request.handler';

const mockRequest = {} as HttpRequest<any>;

const mockQuoteUnderThresholdResponse = {
  error: {
    errors: [
      {
        message:
          'Quote with code [00000282] and version [1] does not meet the threshold.',
        type: 'QuoteUnderThresholdError',
      },
    ],
  },
} as HttpErrorResponse;

const mockCartValidationResponse = {
  error: {
    errors: [
      {
        type: 'CartValidationError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteDiscountResponse = {
  error: {
    errors: [
      {
        message:
          'Discount type is absolute, but the discont rate is greater than cart total [258.0]!',
        type: 'IllegalArgumentError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteExpirationDateResponse = {
  error: {
    errors: [
      {
        message: 'Invalid quote expiration time [7 August 2023].',
        type: 'IllegalArgumentError',
      },
    ],
  },
} as HttpErrorResponse;

const mockIllegalArgumentResponse = {
  error: {
    errors: [
      {
        message: 'Another issue',
        type: 'IllegalArgumentError',
      },
    ],
  },
} as HttpErrorResponse;

const mockEmptyResponse = {
  error: null,
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

describe('QuoteBadRequestHandler', () => {
  let service: QuoteBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(QuoteBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_REQUEST);
  });

  it('should handle treshold error', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(mockRequest, mockQuoteUnderThresholdResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.threshold.underThresholdError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle cart validation error', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(mockRequest, mockCartValidationResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.cartValidationIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle quote discount error', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(mockRequest, mockQuoteDiscountResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.absoluteDiscountIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle expiration date error', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(mockRequest, mockQuoteExpirationDateResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.expirationDateIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should raise no message for IllegalArgumentErrors that are not related to quote discounts', () => {
    spyOn(globalMessageService, 'add');

    service.handleError(mockRequest, mockIllegalArgumentResponse);

    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should be able to deal with an empty error response', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(mockRequest, mockEmptyResponse);

    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should carry normal priority', () => {
    expect(service.getPriority()).toBe(Priority.NORMAL);
  });
});
