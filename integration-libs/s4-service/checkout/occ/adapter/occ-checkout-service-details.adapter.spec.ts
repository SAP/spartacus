import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { OccCheckoutServiceDetailsAdapter } from './occ-checkout-service-details.adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
const mockUrl =
  'testUrl/setServiceScheduleSlot?userId=testUserId&cartId=testCartId';
export class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl = vi.fn().mockReturnValue(mockUrl);
}
describe('OccCheckoutServiceDetailsAdapter', () => {
  let adapter: OccCheckoutServiceDetailsAdapter;
  let httpMock: HttpTestingController;
  let loggerService: any;
  let occEndpointsService: any;

  const mockServiceDetails: ServiceDetails = {
    scheduledAt: '2021-12-31T23:59:59Z',
  };

  const userId = 'user123';
  const cartId = 'cart456';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCheckoutServiceDetailsAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: LoggerService, useValue: loggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(OccCheckoutServiceDetailsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    loggerService = { error: vi.fn() };
    occEndpointsService = { buildUrl: vi.fn() };
    occEndpointsService.buildUrl.mockReturnValue(mockUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a PATCH request to the correct URL with the correct headers', () => {
    adapter
      .setServiceScheduleSlot(userId, cartId, mockServiceDetails)
      .subscribe();
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({});
  });

  it('should handle errors and call tryNormalizeHttpError', () => {
    const mockError = {
      status: 500,
      statusText: 'We are getting an internal server error',
    };
    adapter
      .setServiceScheduleSlot(userId, cartId, mockServiceDetails)
      .subscribe({
        error: (error) => {
          expect(error.statusText).toEqual(mockError.statusText);
        },
      });
    const req = httpMock.expectOne(mockUrl);
    req.flush(mockError, mockError);
  });
});
