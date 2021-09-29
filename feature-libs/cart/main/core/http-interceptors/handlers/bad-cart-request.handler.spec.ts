import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
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

const MockOtherCartErrorResponse = {
  error: {
    errors: [
      {
        subjectType: 'cart',
        reason: 'other',
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

  it('should match cart not found error', () => {
    expect(service.hasMatch(MockCartNotFoundResponse)).toBe(true);
  });

  it('should NOT match cart not found error for selectiive cart', () => {
    expect(service.hasMatch(MockCartNotFoundResponseForSelectiveCart)).toBe(
      false
    );
  });

  it('should NOT match other errors', () => {
    expect(service.hasMatch(MockOtherCartErrorResponse)).toBe(false);
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

  it('should handle bad cart error', () => {
    service.handleError(MockRequest, MockCartNotFoundResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.cartNotFound' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should not handle bad cart error for selective cart', () => {
    service.handleError(MockRequest, MockCartNotFoundResponseForSelectiveCart);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });
});
