import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
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

  it.each<[string, string, { country: string } | undefined]>([
    ['fiscal.id.invalid.format', 'invalidFormat', { country: 'PT' }],
    ['fiscal.id.checksum.invalid', 'checksumInvalid', undefined],
    ['fiscal.id.custom.validation.failed', 'customValidationFailed', undefined],
    ['fiscal.id.rules.not.configured', 'rulesNotConfigured', { country: 'PT' }],
    ['fiscal.id.country.required', 'countryRequired', undefined],
    ['fiscal.id.store.disabled', 'storeDisabled', undefined],
  ])(
    'localizes %s even when the backend message is absent',
    (errorCode, key, params) => {
      const response = new HttpErrorResponse({
        status: 400,
        url: '/cart/fiscalIds',
        error: {
          errors: [{ type: 'FiscalIdValidationError', errorCode }],
        },
      });

      expect(handler.hasMatch(response)).toBe(true);
      handler.handleError(
        new HttpRequest('PUT', '/cart/fiscalIds', { sapCountry: 'PT' }),
        response
      );

      expect(add).toHaveBeenCalledExactlyOnceWith(
        { key: 'fiscalId.errors.' + key, ...(params ? { params } : {}) },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  );

  it('deduplicates codes and uses the request country instead of backend text', () => {
    const response = new HttpErrorResponse({
      status: 400,
      url: '/cart/fiscalIds?fields=DEFAULT',
      error: {
        errors: [
          {
            type: 'FiscalIdValidationError',
            errorCode: 'fiscal.id.invalid.format',
            message: 'Fiscal ID format is invalid for country DE',
          },
          {
            type: 'FiscalIdValidationError',
            errorCode: 'fiscal.id.invalid.format',
            message: 'A different non-localized backend message',
          },
          {
            type: 'ValidationError',
            errorCode: 'fiscal.id.country.required',
          },
        ],
      },
    });

    expect(handler.hasMatch(response)).toBe(true);
    handler.handleError(
      new HttpRequest('PUT', '/cart/fiscalIds', { sapCountry: 'PT' }),
      response
    );

    expect(add.mock.calls).toEqual([
      [
        { key: 'fiscalId.errors.invalidFormat', params: { country: 'PT' } },
        GlobalMessageType.MSG_TYPE_ERROR,
      ],
      [
        { key: 'fiscalId.errors.countryRequired' },
        GlobalMessageType.MSG_TYPE_ERROR,
      ],
    ]);
  });

  it.each([{}, null])(
    'uses an empty interpolation value when the request has no country: %j',
    (body) => {
      handler.handleError(
        new HttpRequest('PUT', '/cart/fiscalIds', body),
        new HttpErrorResponse({
          status: 400,
          error: {
            errors: [
              {
                errorCode: 'fiscal.id.invalid.format',
                message: 'Fiscal ID format is invalid for country DE',
              },
              {
                errorCode: 'fiscal.id.rules.not.configured',
                message:
                  'Fiscal ID validation is not configured for country DE',
              },
            ],
          },
        })
      );

      expect(add.mock.calls).toEqual([
        [
          { key: 'fiscalId.errors.invalidFormat', params: { country: '' } },
          GlobalMessageType.MSG_TYPE_ERROR,
        ],
        [
          {
            key: 'fiscalId.errors.rulesNotConfigured',
            params: { country: '' },
          },
          GlobalMessageType.MSG_TYPE_ERROR,
        ],
      ]);
    }
  );

  it('uses one localized fallback for unknown or missing codes even when backend messages exist', () => {
    handler.handleError(
      new HttpRequest('PUT', '/cart/fiscalIds', {}),
      new HttpErrorResponse({
        status: 400,
        error: {
          errors: [
            { errorCode: 'fiscal.id.value.required' },
            { errorCode: 'fiscal.id.value.too.long' },
            { errorCode: 'fiscal.id.entries.required' },
            { errorCode: 'fiscal.id.entries.too.many' },
            {
              errorCode: 'fiscal.id.new.validation.rule',
              message: 'An untranslated custom validation error',
            },
            { errorCode: 'unexpected.error', message: 'Another backend error' },
            { type: 'FiscalIdValidationError', message: 'No code supplied' },
          ],
        },
      })
    );

    expect(add).toHaveBeenCalledExactlyOnceWith(
      { key: 'fiscalId.errors.unknown' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it.each([{}, { errors: [] }])(
    'uses a localized fallback when the response has no errors: %j',
    (error) => {
      handler.handleError(
        new HttpRequest('PUT', '/cart/fiscalIds', {}),
        new HttpErrorResponse({ status: 400, error })
      );

      expect(add).toHaveBeenCalledExactlyOnceWith(
        { key: 'fiscalId.errors.unknown' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  );

  it.each([
    { status: 500, url: '/cart/fiscalIds' },
    { status: 0, url: '/cart/fiscalIds' },
    { status: 401, url: '/cart/fiscalIds' },
    {
      status: 400,
      url: '/cart/paymentdetails',
      error: { errors: [{ type: 'ValidationError' }] },
    },
  ])('leaves unrelated HTTP errors to existing handlers: %j', (response) => {
    expect(handler.hasMatch(new HttpErrorResponse(response))).toBe(false);
    expect(add).not.toHaveBeenCalled();
  });
});
