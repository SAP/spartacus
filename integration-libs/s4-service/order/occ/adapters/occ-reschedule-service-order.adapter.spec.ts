import { TestBed } from '@angular/core/testing';
import { OccRescheduleServiceOrderAdapter } from './occ-reschedule-service-order.adapter';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ServiceDetails } from '@spartacus/s4-service/root';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import createSpy = jasmine.createSpy;

const mockUrl =
  'users/testUserId/orders/testOrderCode/serviceOrder/serviceScheduleSlot';
export class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl = createSpy().and.returnValue(mockUrl);
}
describe('OccRescheduleServiceOrderAdapter', () => {
  let adapter: OccRescheduleServiceOrderAdapter;
  let httpMock: HttpTestingController;
  let loggerService: jasmine.SpyObj<LoggerService>;
  let occEndpointsService: jasmine.SpyObj<OccEndpointsService>;

  const mockServiceDetails: ServiceDetails = {
    scheduledAt: '2021-12-31T23:59:59Z',
  };

  const userId = 'user123';
  const orderCode = 'order456';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OccRescheduleServiceOrderAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: LoggerService, useValue: loggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(OccRescheduleServiceOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    loggerService = jasmine.createSpyObj('LoggerService', ['error']);
    occEndpointsService = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);
    occEndpointsService.buildUrl.and.returnValue(mockUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should send a PATCH request to the correct URL with the correct headers', () => {
    adapter
      .rescheduleServiceOrder(userId, orderCode, mockServiceDetails)
      .subscribe();
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({});
  });

  it('should handle errors and call normalizeHttpError', () => {
    const mockError = {
      status: 500,
      statusText: 'We are getting an internal server error',
    };
    adapter
      .rescheduleServiceOrder(userId, orderCode, mockServiceDetails)
      .subscribe({
        error: (error) => {
          expect(error.statusText).toEqual(mockError.statusText);
        },
      });
    const req = httpMock.expectOne(mockUrl);
    req.flush(mockError, mockError);
  });
});
