import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  provideConfig,
} from '@spartacus/core';
import { CartUserEmailResponse } from '../model';
import { OpfApiCheckoutAdapter } from './opf-api-checkout.adapter';

describe('OpfApiCheckoutAdapter', () => {
  let adapter: OpfApiCheckoutAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEndpointsService: OccEndpointsService;
  let loggerService: LoggerService;

  const userId = 'testUser';
  const cartId = 'testCart';
  const emailResponse: CartUserEmailResponse = {
    sapCustomerEmail: 'test@example.com',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfApiCheckoutAdapter,
        ConverterService,
        OccEndpointsService,
        LoggerService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideConfig({
          backend: {
            occ: {
              endpoints: {
                cartUserEmail: 'users/${userId}/carts/${cartId}/email',
              },
            },
          },
        }),
      ],
    });

    adapter = TestBed.inject(OpfApiCheckoutAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    loggerService = TestBed.inject(LoggerService);

    spyOn(converterService, 'pipeable').and.callFake(
      () => (source: any) => source
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve cart user email', () => {
    adapter.getCartUserEmail(userId, cartId).subscribe((result) => {
      expect(result).toEqual(emailResponse);
    });

    const req = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          occEndpointsService.buildUrl('cartUserEmail', {
            urlParams: { userId, cartId },
          })
    );
    expect(req.request.method).toBe('GET');
    req.flush(emailResponse);
  });

  it('should handle error when retrieving cart user email', () => {
    const errorResponse = { status: 500, statusText: 'Server Error' };
    spyOn(loggerService, 'error').and.callThrough();

    adapter.getCartUserEmail(userId, cartId).subscribe(
      () => fail('expected an error, not cart user email'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          occEndpointsService.buildUrl('cartUserEmail', {
            urlParams: { userId, cartId },
          })
    );
    req.flush(null, errorResponse);
  });
});
