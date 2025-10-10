import { TestBed } from '@angular/core/testing';
import { SubscriptionActionService } from './subscription-billing-action.service';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  SubscriptionActionsConnector,
  SubscriptionBillingConnector,
} from '../connector';
import {
  SubscriptionCancellationDetails,
  GetSubscriptionByCodeReloadEvent,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

const mockRoutingService = {
  go: jasmine.createSpy('go'),
};

const mockStore = {
  dispatch: jasmine.createSpy(),
  pipe: jasmine.createSpy().and.returnValue(of({})),
};

describe('SubscriptionActionService', () => {
  let service: SubscriptionActionService;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let cancelConnector: jasmine.SpyObj<SubscriptionActionsConnector>;
  let subscriptionBillingConnector: jasmine.SpyObj<SubscriptionBillingConnector>;
  const userId = 'user123';
  const subscriptionCode = 'sub456';

  beforeEach(() => {
    userIdService = jasmine.createSpyObj('UserIdService', ['getUserId']);
    cancelConnector = jasmine.createSpyObj('SubscriptionActionsConnector', [
      'getEffectiveCancellationDate',
      'cancelSubscription',
      'reversecancellation',
      'withdrawal',
    ]);
    subscriptionBillingConnector = jasmine.createSpyObj(
      'SubscriptionBillingConnector',
      ['check']
    );
    TestBed.configureTestingModule({
      providers: [
        SubscriptionActionService,
        { provide: UserIdService, useValue: userIdService },
        {
          provide: SubscriptionActionsConnector,
          useValue: cancelConnector,
        },
        {
          provide: SubscriptionBillingConnector,
          useValue: subscriptionBillingConnector,
        },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: Store, useValue: mockStore },
      ],
    });

    service = TestBed.inject(SubscriptionActionService);
  });
  it('should return subscription reload events', () => {
    const events = service['getSubscriptionByCodeReloadEvents']();
    expect(events).toEqual([GetSubscriptionByCodeReloadEvent]);
  });

  describe('getEffectiveCancellationDate', () => {
    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.getEffectiveCancellationDate.and.returnValue(
        of('mockDate')
      );

      service
        .getEffectiveCancellationDate(subscriptionCode)
        .subscribe((res) => {
          expect(
            cancelConnector.getEffectiveCancellationDate
          ).toHaveBeenCalledWith(userId, subscriptionCode);
          expect(res).toBe('mockDate');
          done();
        });
    });
    it('should emit error when userId or code is missing', (done) => {
      userIdService.getUserId.and.returnValue(of(null as any));

      service
        .cancelSubscription({ subscriptionEndAt: '2026-01-01' }, undefined)
        .subscribe({
          next: () => {
            fail('Expected an error, but got a value');
            done();
          },
          error: (err) => {
            expect(err.message).toBe(
              'Cannot cancel subscription: missing user ID or subscription code.'
            );
            done();
          },
        });
    });
    it('should emit error when userId or subscriptionCode is missing in getEffectiveCancellationDate', (done) => {
      userIdService.getUserId.and.returnValue(of(null as any));

      service.getEffectiveCancellationDate(undefined).subscribe({
        next: () => {
          fail('Expected an error, but got a value');
          done();
        },
        error: (err) => {
          expect(err.message).toBe(
            'Cannot fetch cancellation effective date: missing user ID or subscription code.'
          );
          done();
        },
      });
    });
  });

  describe('cancelSubscription', () => {
    const cancellationDetails: SubscriptionCancellationDetails = {
      subscriptionEndAt: '2026-01-01',
    };

    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.cancelSubscription.and.returnValue(of('success'));

      service
        .cancelSubscription(cancellationDetails, subscriptionCode)
        .subscribe((res) => {
          expect(cancelConnector.cancelSubscription).toHaveBeenCalledWith(
            userId,
            subscriptionCode,
            cancellationDetails
          );
          expect(res).toBe('success');
          done();
        });
    });

    it('should emit error when userId or code is missing', (done) => {
      userIdService.getUserId.and.returnValue(of(null as any));

      service.cancelSubscription(cancellationDetails, undefined).subscribe({
        next: () => {
          fail('Expected an error, but got a value');
          done();
        },
        error: (err) => {
          expect(err.message).toBe(
            'Cannot cancel subscription: missing user ID or subscription code.'
          );
          done();
        },
      });
    });
  });

  describe('reverseCancellation', () => {
    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.reversecancellation.and.returnValue(of('reversed'));

      service.reverseCancellation(subscriptionCode).subscribe((res) => {
        expect(cancelConnector.reversecancellation).toHaveBeenCalledWith(
          userId,
          subscriptionCode
        );
        expect(res).toBe('reversed');
        done();
      });
    });

    it('should emit error when userId or code is missing', (done) => {
      userIdService.getUserId.and.returnValue(of(null as any));

      service.reverseCancellation(undefined).subscribe({
        next: () => {
          fail('Expected an error, but got a value');
          done();
        },
        error: (err) => {
          expect(err.message).toBe(
            'Cannot reverse cancellation: missing user ID or subscription code.'
          );
          done();
        },
      });
    });
  });

  describe('withdrawal', () => {
    const withdrawalData: SubscriptionWithdraw = {
      subscriptionId: 'sub456',
      version: '1',
      withdrawnAt: '2025-07-01',
      withdrawalPeriodEndDate: '2025-07-15',
    };

    it('should call connector with correct params', (done) => {
      userIdService.getUserId.and.returnValue(of(userId));
      cancelConnector.withdrawal.and.returnValue(of('withdrawn'));

      service.withdrawal(withdrawalData, subscriptionCode).subscribe((res) => {
        expect(cancelConnector.withdrawal).toHaveBeenCalledWith(
          userId,
          subscriptionCode,
          withdrawalData
        );
        expect(res).toBe('withdrawn');
        done();
      });
    });

    it('should emit error when userId or code is missing', (done) => {
      userIdService.getUserId.and.returnValue(of(null as any));

      service.withdrawal(withdrawalData, undefined).subscribe({
        next: () => {
          fail('Expected an error, but got a value');
          done();
        },
        error: (err) => {
          expect(err.message).toBe(
            'Cannot withdraw subscription: missing user ID or subscription code.'
          );
          done();
        },
      });
    });
  });
});
