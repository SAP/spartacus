import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  HttpResponseStatus,
  GlobalMessageType,
  Config,
} from '@spartacus/core';
import { QuoteConfig } from '../config/quote-config';
import { CommerceQuotesBadRequestHandler } from './bad-request.handler';

const MockRequest = {} as HttpRequest<any>;
const MockCQConfig: QuoteConfig = {
  commerceQuotes: {
    tresholds: {
      requestInitiation: 10000,
      sellerAutoApproval: 1,
    },
  },
};

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

describe('CommerceQuotesBadRequestHandler', () => {
  let service: CommerceQuotesBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommerceQuotesBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: Config,
          useValue: MockCQConfig,
        },
      ],
    });
    service = TestBed.inject(CommerceQuotesBadRequestHandler);
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
        key: 'commerceQuotes.httpHandlers.threshold.underTresholdError',
        params: {
          minValue: MockCQConfig.commerceQuotes?.tresholds?.requestInitiation,
        },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
