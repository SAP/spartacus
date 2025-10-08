import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccCancelSubscriptionAdapter } from './occ-subscription-billing-cancel.adapter';
import { OccEndpointsService } from '@spartacus/core';
// import { OccEndpointsService, LoggerService } from '@spartacus/core';
import {
  CancellationDetails,
  Withdrawal as Withdrawal,
} from '@spartacus/subscription-billing/root';

describe('OccCancelSubscriptionAdapter', () => {
  let adapter: OccCancelSubscriptionAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: jasmine.SpyObj<OccEndpointsService>;
  //   let loggerService: jasmine.SpyObj<LoggerService>;

  const mockUserId = 'testUser';
  const mockSubscriptionCode = 'testSubscription';

  const mockCancellationDetails: CancellationDetails = {
    // subscriptionId: 'sub123',
    // validTillDate: '2025-07-10',
    // ratePlanId: 'ratePlan456',
    // version: '1',
    subscriptionEndAt: '2025-07-20',
  };

  const mockWithdrawal: Withdrawal = {
    subscriptionId: 'sub123',
    version: '1',
    withdrawnAt: '2025-07-05T10:00:00Z',
    withdrawalPeriodEndDate: '2025-07-06',
  };

  beforeEach(() => {
    const occEndpointsSpy = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);
    // const loggerSpy = jasmine.createSpyObj('LoggerService', ['log', 'warn', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCancelSubscriptionAdapter,
        { provide: OccEndpointsService, useValue: occEndpointsSpy },
        // { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    adapter = TestBed.inject(OccCancelSubscriptionAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(
      OccEndpointsService
    ) as jasmine.SpyObj<OccEndpointsService>;
    // loggerService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should cancel subscription', () => {
    const mockUrl = 'mockUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    adapter
      .cancelSubscription(
        mockUserId,
        mockSubscriptionCode,
        mockCancellationDetails
      )
      .subscribe();

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCancellationDetails);
    req.flush({});
  });

  it('should fetch cancellation subscription effective date', () => {
    const mockUrl = 'mockEffectiveDateUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    adapter
      .cancellationSubscriptionEffectiveDate(mockUserId, mockSubscriptionCode)
      .subscribe();

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should handle withdrawal', () => {
    const mockUrl = 'mockWithdrawalUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    adapter
      .withdrawal(mockUserId, mockSubscriptionCode, mockWithdrawal)
      .subscribe();

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockWithdrawal);
    req.flush({});
  });

  it('should reverse cancellation', () => {
    const mockUrl = 'mockReverseCancellationUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    adapter.reverseCancellation(mockUserId, mockSubscriptionCode).subscribe();

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeNull();
    req.flush({});
  });

  it('should handle error when cancelSubscription fails', () => {
    const mockUrl = 'mockUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    const mockHttpError = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    const mockErrorBody = {
      message: 'Server error',
    };

    adapter
      .cancelSubscription(
        mockUserId,
        mockSubscriptionCode,
        mockCancellationDetails
      )
      .subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('Http failure response'); // <-- match Angular’s default error message
          // Optionally, check logger was called if you mock LoggerService
        },
      });

    const req = httpMock.expectOne(mockUrl);
    req.flush(mockErrorBody, mockHttpError);
  });
  it('should handle error when cancellationSubscriptionEffectiveDate fails', () => {
    const mockUrl = 'mockEffectiveDateUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    const mockHttpError = {
      status: 404,
      statusText: 'Not Found',
    };

    const mockErrorBody = {
      message: 'Effective date not found',
    };

    adapter
      .cancellationSubscriptionEffectiveDate(mockUserId, mockSubscriptionCode)
      .subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('Http failure response'); // or test exact normalized structure if needed
        },
      });

    const req = httpMock.expectOne(mockUrl);
    req.flush(mockErrorBody, mockHttpError);
  });
  it('should handle error when withdrawal fails', () => {
    const mockUrl = 'mockWithdrawalUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    const mockHttpError = {
      status: 400,
      statusText: 'Bad Request',
    };

    const mockErrorBody = {
      message: 'Invalid withdrawal data',
    };

    adapter
      .withdrawal(mockUserId, mockSubscriptionCode, mockWithdrawal)
      .subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('Http failure response');
        },
      });

    const req = httpMock.expectOne(mockUrl);
    req.flush(mockErrorBody, mockHttpError);
  });
  it('should handle error when reverseCancellation fails', () => {
    const mockUrl = 'mockReverseCancellationUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    const mockHttpError = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    const mockErrorBody = {
      message: 'Unable to reverse cancellation',
    };

    adapter.reverseCancellation(mockUserId, mockSubscriptionCode).subscribe({
      next: () => fail('Expected an error, but got success'),
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain('Http failure response');
      },
    });

    const req = httpMock.expectOne(mockUrl);
    req.flush(mockErrorBody, mockHttpError);
  });
});
