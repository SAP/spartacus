import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
import { FiscalIdRequestHandler } from './fiscal-id-request.handler';

describe('FiscalIdRequestHandler', () => {
  let handler: FiscalIdRequestHandler;
  let add: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    add = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        FiscalIdRequestHandler,
        { provide: GlobalMessageService, useValue: { add } },
      ],
    });
    handler = TestBed.inject(FiscalIdRequestHandler);
  });
  it('handles the actual backend FiscalIdValidationError once per message', () => {
    const error = {
      type: 'FiscalIdValidationError',
      errorCode: 'fiscal.id.value.required',
      message: 'Fiscal ID value must not be blank',
    };
    const response = new HttpErrorResponse({
      status: 400,
      url: '/cart/fiscalIds',
      error: { errors: [error, error] },
    });
    expect(handler.hasMatch(response)).toBe(true);
    handler.handleError(
      new HttpRequest('PUT', '/cart/fiscalIds', {}),
      response
    );
    expect(add).toHaveBeenCalledExactlyOnceWith(
      error.message,
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
  it('uses the existing fallback for errors without a message', () => {
    handler.handleError(
      new HttpRequest('PUT', '/cart/fiscalIds', {}),
      new HttpErrorResponse({ status: 400, error: {} })
    );
    expect(add).toHaveBeenCalledExactlyOnceWith(
      { key: 'httpHandlers.otherCartErrors' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
  it('leaves unrelated HTTP errors to the existing handlers', () => {
    expect(
      handler.hasMatch(
        new HttpErrorResponse({ status: 500, url: '/cart/fiscalIds' })
      )
    ).toBe(false);
    expect(
      handler.hasMatch(
        new HttpErrorResponse({
          status: 400,
          url: '/cart/paymentdetails',
          error: { errors: [{ type: 'ValidationError' }] },
        })
      )
    ).toBe(false);
  });
});
