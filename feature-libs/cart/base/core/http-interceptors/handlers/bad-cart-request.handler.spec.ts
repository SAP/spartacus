import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
} from '@spartacus/core';
import { BadCartRequestHandler } from './bad-cart-request.handler';

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

const MockCartNotFoundResponse = {
  error: {
    errors: [
      {
        subjectType: 'cart',
        reason: 'notFound',
      },
    ],
  },
} as HttpErrorResponse;

const MockNonCartErrorResponse = {
  error: {
    errors: [
      {
        subjectType: 'cart',
        reason: 'other',
      },
    ],
  },
} as HttpErrorResponse;

const MockCartErrorResponse = {
  error: {
    errors: [
      {
        type: 'CartError',
        message: 'cart error occur.',
      },
    ],
  },
} as HttpErrorResponse;

const MockCartNotFoundResponseForSelectiveCart = {
  error: {
    errors: [
      {
        subjectType: 'cart',
        subject: 'selectivecart-electronics-12345',
        reason: 'notFound',
        type: 'CartError',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

describe('BadCartRequestHandler', () => {
  let service: BadCartRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadCartRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(BadCartRequestHandler);
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

  it('should match cart  error', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(true);
    expect(service.hasMatch(MockCartErrorResponse)).toBe(true);
  });

  it('should not have a match when super.hasMatch() is false', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(false);
    expect(service.hasMatch(MockCartErrorResponse)).toBe(false);
  });

  it('should NOT match other errors', () => {
    expect(service.hasMatch(MockNonCartErrorResponse)).toBe(false);
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

  it('should handle cart not found error', () => {
    service.handleError(MockRequest, MockCartNotFoundResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.cartNotFound' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle other cart errors', () => {
    service.handleError(MockRequest, MockCartErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'cart error occur.',
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should not handle bad cart error for selective cart', () => {
    service.handleError(MockRequest, MockCartNotFoundResponseForSelectiveCart);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });
});
