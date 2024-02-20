import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { QuoteBadRequestHandler } from './quote-bad-request.handler';

const mockRequest = {} as HttpRequest<any>;

const mockQuoteUnderThresholdResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
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

const mockNotFoundResponse = {
  status: HttpResponseStatus.NOT_FOUND,
} as HttpErrorResponse;

const mockCartValidationResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  error: {
    errors: [
      {
        type: 'CartValidationError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteAccessErrorResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  error: {
    errors: [
      {
        type: 'CartQuoteAccessError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteDiscountResponse = {
  status: HttpResponseStatus.BAD_REQUEST,
  error: {
    errors: [
      {
        message:
          'Discount type is absolute, but the discount rate is greater than cart total [258.0]!',
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
  let classUnderTest: QuoteBadRequestHandler;
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
    classUnderTest = TestBed.inject(QuoteBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(classUnderTest.responseStatus).toEqual(
      HttpResponseStatus.BAD_REQUEST
    );
  });

  it('should handle threshold error', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockQuoteUnderThresholdResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.threshold.underThresholdError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle cart validation error', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockCartValidationResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.cartValidationIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle quote cart access error issues', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockQuoteAccessErrorResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.quoteCartIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle quote discount error', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockQuoteDiscountResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.absoluteDiscountIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle expiration date error', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockQuoteExpirationDateResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.expirationDateIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should raise no message for IllegalArgumentErrors that are not related to quote discounts', () => {
    spyOn(globalMessageService, 'add');

    classUnderTest.handleError(mockRequest, mockIllegalArgumentResponse);

    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should be able to deal with an empty error response', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockEmptyResponse);

    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should carry normal priority', () => {
    expect(classUnderTest.getPriority()).toBe(Priority.NORMAL);
  });

  describe('hasMatch', () => {
    it('should detect threshold issues', () => {
      expect(classUnderTest.hasMatch(mockQuoteUnderThresholdResponse)).toBe(
        true
      );
    });

    it('should detect cart validation issues', () => {
      expect(classUnderTest.hasMatch(mockCartValidationResponse)).toBe(true);
    });

    it('should detect quote cart access issues', () => {
      expect(classUnderTest.hasMatch(mockQuoteAccessErrorResponse)).toBe(true);
    });

    it('should detect quote cart illegal argument issues', () => {
      expect(classUnderTest.hasMatch(mockQuoteDiscountResponse)).toBe(true);
    });

    it('should know that it is not responsible for 404', () => {
      expect(classUnderTest.hasMatch(mockNotFoundResponse)).toBe(false);
    });
  });
});
