import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  HttpResponseStatus,
  GlobalMessageType,
} from '@spartacus/core';
import { QuoteBadRequestHandler } from './quote-bad-request.handler';

const MockRequest = {} as HttpRequest<any>;
//TODO CHHI: Delete when decision has been taken about quote request dialog
// const MockCQConfig: QuoteConfig = {
//   quote: {
//     tresholds: {
//       requestInitiation: 10000,
//       sellerAutoApproval: 1,
//     },
//   },
// };

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
});
