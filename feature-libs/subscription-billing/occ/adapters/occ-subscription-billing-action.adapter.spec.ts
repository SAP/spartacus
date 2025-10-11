import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccSubscriptionActionsAdapter } from './occ-subscription-billing-action.adapter';
import { OccEndpointsService } from '@spartacus/core';
import {
  SubscriptionCancellationDetails,
  SubscriptionWithdraw as Withdrawal,
} from '@spartacus/subscription-billing/root';

describe('OccSubscriptionActionsAdapter', () => {
  let adapter: OccSubscriptionActionsAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: jasmine.SpyObj<OccEndpointsService>;

  const mockUserId = 'testUser';
  const mockSubscriptionCode = 'testSubscription';

  const mockCancellationDetails: SubscriptionCancellationDetails = {
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

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSubscriptionActionsAdapter,
        { provide: OccEndpointsService, useValue: occEndpointsSpy },
      ],
    });

    adapter = TestBed.inject(OccSubscriptionActionsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(
      OccEndpointsService
    ) as jasmine.SpyObj<OccEndpointsService>;
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
      .getEffectiveCancellationDate(mockUserId, mockSubscriptionCode)
      .subscribe();

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should handle withdrawal', () => {
    const mockUrl = 'mockWithdrawalUrl';
    occEndpointsService.buildUrl.and.returnValue(mockUrl);

    adapter
      .withdrawSubscription(mockUserId, mockSubscriptionCode, mockWithdrawal)
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
          expect(error.message).toContain('Http failure response');
        },
      });

    const req = httpMock.expectOne(mockUrl);
    req.flush(mockErrorBody, mockHttpError);
  });
  it('should handle error when getEffectiveCancellationDate fails', () => {
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
      .getEffectiveCancellationDate(mockUserId, mockSubscriptionCode)
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
      .withdrawSubscription(mockUserId, mockSubscriptionCode, mockWithdrawal)
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
