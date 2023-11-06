import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';
import { QuoteCartService } from '@spartacus/quote/root';
import { of } from 'rxjs';
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

const mockDomainErrorResponse = {
  error: {
    errors: [
      {
        type: 'DomainError',
      },
    ],
  },
} as HttpErrorResponse;

const mockQuoteDiscountResponse = {
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
let isQuoteCartActive: any;

class MockQuoteCartService {
  isQuoteCartActive() {
    return of(isQuoteCartActive);
  }
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
        { provide: QuoteCartService, useClass: MockQuoteCartService },
      ],
    });
    classUnderTest = TestBed.inject(QuoteBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
    isQuoteCartActive = false;
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

  it('should do nothing on domain error issues in case cart is not linked to quote', () => {
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockDomainErrorResponse);

    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle domain error issues in case cart is linked to quote', () => {
    isQuoteCartActive = true;
    spyOn(globalMessageService, 'add');
    classUnderTest.handleError(mockRequest, mockDomainErrorResponse);

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
});
