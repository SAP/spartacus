import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  HttpResponseStatus,
  GlobalMessageType,
  Priority,
} from '@spartacus/core';
import { QuoteBadRequestHandler } from './quote-bad-request.handler';

const MockRequest = {} as HttpRequest<any>;

const MockQuoteUnderThresholdResponse = {
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

const MockCartValidationResponse = {
  error: {
    errors: [
      {
        type: 'CartValidationError',
      },
    ],
  },
} as HttpErrorResponse;

const MockEmptyResponse = {
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
    service.handleError(MockRequest, MockQuoteUnderThresholdResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.threshold.underThresholdError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle cart validation error', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockCartValidationResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.httpHandlers.cartValidationIssue',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should be able to deal with an empty error response', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockEmptyResponse);

    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should carry normal priority', () => {
    expect(service.getPriority()).toBe(Priority.NORMAL);
  });
});
