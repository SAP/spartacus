import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { OccCheckoutFiscalIdAdapter } from './occ-checkout-fiscal-id.adapter';

describe('OccCheckoutFiscalIdAdapter', () => {
  let adapter: OccCheckoutFiscalIdAdapter;
  let http: HttpTestingController;
  let buildUrl: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    buildUrl = vi.fn().mockReturnValue('/cart/fiscalIds');
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OccCheckoutFiscalIdAdapter,
        { provide: OccEndpointsService, useValue: { buildUrl } },
        {
          provide: LoggerService,
          useValue: { debug: vi.fn(), error: vi.fn() },
        },
      ],
    });
    adapter = TestBed.inject(OccCheckoutFiscalIdAdapter);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('sends the supplied entry with PUT and accepts an empty 204 response', async () => {
    const payload = {
      sapCountry: 'PT',
      sapFiscalIdEntries: [{ sapValue: '12345' }],
    };
    const result = firstValueFrom(
      adapter.setFiscalId('anonymous', 'guid', payload)
    );
    const request = http.expectOne('/cart/fiscalIds');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(payload);
    expect(buildUrl).toHaveBeenCalledWith('setCartFiscalId', {
      urlParams: { userId: 'anonymous', cartId: 'guid' },
    });
    request.flush(null, { status: 204, statusText: 'No Content' });
    expect(await result).toBeNull();
  });
  it('preserves structured business errors', async () => {
    const errors = [
      {
        type: 'FiscalIdValidationError',
        errorCode: 'fiscal.id.invalid.format',
        message: 'Invalid value',
      },
    ];
    const result = firstValueFrom(adapter.setFiscalId('current', 'cart', {}));
    http
      .expectOne('/cart/fiscalIds')
      .flush({ errors }, { status: 400, statusText: 'Bad Request' });
    await expect(result).rejects.toMatchObject({
      status: 400,
      details: errors,
    });
  });
});
