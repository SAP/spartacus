import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
} from '@spartacus/core';
import { BadVoucherRequestHandler } from './bad-voucher-request.handler';

const MockRequest = {} as HttpRequest<any>;

const MockRandomResponse = {} as HttpErrorResponse;

const MockJaloErrorResponse = {
  error: {
    errors: [
      {
        type: 'JaloObjectNoLongerValidError',
      },
    ],
  },
} as HttpErrorResponse;

const MockVoucherErrorResponse = {
  error: {
    errors: [
      {
        type: 'VoucherOperationError',
      },
    ],
  },
} as HttpErrorResponse;

const MockVoucherInvalidErrorResponse = {
  error: {
    errors: [
      {
        type: 'VoucherOperationError',
        message: 'coupon.invalid.code.provided',
      },
    ],
  },
} as HttpErrorResponse;

const MockVoucherExceededErrorResponse = {
  error: {
    errors: [
      {
        type: 'VoucherOperationError',
        message: 'coupon.already.redeemed',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

describe('BadVoucherRequestHandler', () => {
  let service: BadVoucherRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadVoucherRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(BadVoucherRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add');
    spyOn(globalMessageService, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_REQUEST);
  });

  it('should match voucher error', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(true);
    expect(service.hasMatch(MockVoucherErrorResponse)).toBe(true);
  });

  it('should not have a match when super.hasMatch() is false', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(false);
    expect(service.hasMatch(MockVoucherErrorResponse)).toBe(false);
  });

  it('should not handle response without errors', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should not handle response with Jalo errors', () => {
    service.handleError(MockRequest, MockJaloErrorResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should not show error with error type JaloObjectNoLongerValidError', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle invalid voucher error', () => {
    service.handleError(MockRequest, MockVoucherInvalidErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.invalidCodeProvided' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle exceeded voucher error', () => {
    service.handleError(MockRequest, MockVoucherExceededErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.voucherExceeded' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
