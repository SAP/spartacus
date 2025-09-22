import { TestBed } from '@angular/core/testing';
import { SubscriptionBillingCancelService } from './subscription-billing-cancel.service';
import { UserIdService } from '@spartacus/core';
import { CancelSubscriptionOrderConnector } from '../connector';
import {
  CancellationDetails,
  reverseCancellation,
  withdrawal
} from '@spartacus/subscription-billing/root';
import { of } from 'rxjs';

describe('SubscriptionBillingCancelService', () => {
  let service: SubscriptionBillingCancelService;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let cancelConnector: jasmine.SpyObj<CancelSubscriptionOrderConnector>;

  const userId = 'user123';
  const subscriptionCode = 'sub456';

  beforeEach(() => {
    userIdService = jasmine.createSpyObj('UserIdService', ['getUserId']);
    cancelConnector = jasmine.createSpyObj('CancelSubscriptionOrderConnector', [
      'cancellationSubscriptionEffectiveDate',
      'cancelSubscription',
      'reversecancellation',
      'withdrawal'
    ]);

    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingCancelService,
        { provide: UserIdService, useValue: userIdService },
        { provide: CancelSubscriptionOrderConnector, useValue: cancelConnector },
        // You can mock the remaining dependencies if needed
      ]
    });

    service = TestBed.inject(SubscriptionBillingCancelService);
  });

  describe('cancellationSubscriptionEffectiveDate', () => {
    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.cancellationSubscriptionEffectiveDate.and.returnValue(of('mockDate'));

      service.cancellationSubscriptionEffectiveDate(subscriptionCode).subscribe((res) => {
        expect(cancelConnector.cancellationSubscriptionEffectiveDate)
          .toHaveBeenCalledWith(userId, subscriptionCode);
        expect(res).toBe('mockDate');
        done();
      });
    });

    it('should throw error when userId or code is missing', () => {
      userIdService.getUserId.and.returnValue(of(null as any));
      expect(() => {
        service.cancellationSubscriptionEffectiveDate(undefined).subscribe();
      }).toThrowError('Cannot fetch cancellation effective date: missing user ID or subscription code.');
    });
  });

  describe('cancelSubscription', () => {
    const cancellationDetails: CancellationDetails = {
      subscriptionId: 'sub456',
      validTillDate: '2025-12-31',
      subscriptionEndDate: '2026-01-01',
      ratePlanId: 'rate123',
      version: '1',
    };

    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.cancelSubscription.and.returnValue(of('success'));

      service.cancelSubscription(cancellationDetails, subscriptionCode).subscribe((res) => {
        expect(cancelConnector.cancelSubscription)
          .toHaveBeenCalledWith(userId, subscriptionCode, cancellationDetails);
        expect(res).toBe('success');
        done();
      });
    });

    it('should throw error when userId or code is missing', () => {
      userIdService.getUserId.and.returnValue(of(null as any));
      expect(() => {
        service.cancelSubscription(cancellationDetails, undefined).subscribe();
      }).toThrowError('Cannot cancel subscription: missing user ID or subscription code.');
    });
  });

  describe('reverseCancellation', () => {
    const reverse: reverseCancellation = {
      subscriptionId: 'sub456',
      version: '1'
    };

    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.reversecancellation.and.returnValue(of('reversed'));

      service.reverseCancellation(reverse, subscriptionCode).subscribe((res) => {
        expect(cancelConnector.reversecancellation)
          .toHaveBeenCalledWith(userId, subscriptionCode, reverse);
        expect(res).toBe('reversed');
        done();
      });
    });

    it('should throw error when userId or code is missing', () => {
      userIdService.getUserId.and.returnValue(of(null as any));
      expect(() => {
        service.reverseCancellation(reverse, undefined).subscribe();
      }).toThrowError('Cannot reverse cancellation: missing user ID or subscription code.');
    });
  });

  describe('withdrawal', () => {
    const withdrawalData: withdrawal = {
      subscriptionId: 'sub456',
      version: '1',
      withdrawnAt: '2025-07-01',
      withdrawalPeriodEndDate: '2025-07-15',
    };

    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.withdrawal.and.returnValue(of('withdrawn'));

      service.withdrawal(withdrawalData, subscriptionCode).subscribe((res) => {
        expect(cancelConnector.withdrawal)
          .toHaveBeenCalledWith(userId, subscriptionCode, withdrawalData);
        expect(res).toBe('withdrawn');
        done();
      });
    });

    it('should throw error when userId or code is missing', () => {
      userIdService.getUserId.and.returnValue(of(null as any));
      expect(() => {
        service.withdrawal(withdrawalData, undefined).subscribe();
      }).toThrowError('Cannot withdraw subscription: missing user ID or subscription code.');
    });
  });
});
