import { TestBed } from '@angular/core/testing';
import { SubscriptionActionsService } from './subscription-actions.service';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  SubscriptionActionsConnector,
  SubscriptionConnector,
} from '../connector';
import {
  SubscriptionCancellationDetails,
  GetSubscriptionByCodeReloadEvent,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { firstValueFrom, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

const mockRoutingService = {
  go: vi.fn(),
};

const mockStore = {
  dispatch: vi.fn(),
  pipe: vi.fn().mockReturnValue(of({})),
};

describe('SubscriptionActionsService', () => {
  let service: SubscriptionActionsService;
  let userIdService: any;
  let cancelConnector: any;
  let subscriptionConnector: any;
  const userId = 'user123';
  const subscriptionCode = 'sub456';

  beforeEach(() => {
    userIdService = { getUserId: vi.fn() };
    cancelConnector = {
      getEffectiveCancellationDate: vi.fn(),
      cancelSubscription: vi.fn(),
      reverseCancellation: vi.fn(),
      withdrawSubscription: vi.fn(),
    };
    subscriptionConnector = { check: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        SubscriptionActionsService,
        { provide: UserIdService, useValue: userIdService },
        {
          provide: SubscriptionActionsConnector,
          useValue: cancelConnector,
        },
        {
          provide: SubscriptionConnector,
          useValue: subscriptionConnector,
        },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: Store, useValue: mockStore },
      ],
    });

    service = TestBed.inject(SubscriptionActionsService);
  });
  it('should return subscription reload events', () => {
    const events = service['getSubscriptionByCodeReloadEvents']();
    expect(events).toEqual([GetSubscriptionByCodeReloadEvent]);
  });

  describe('getEffectiveCancellationDate', () => {
    it('should call connector with correct params', async () => {
      userIdService.getUserId.mockReturnValue(of(userId));
      cancelConnector.getEffectiveCancellationDate.mockReturnValue(
        of('mockDate')
      );

      const res = await firstValueFrom(
        service.getEffectiveCancellationDate(subscriptionCode)
      );
      expect(
        cancelConnector.getEffectiveCancellationDate
      ).toHaveBeenCalledWith(userId, subscriptionCode);
      expect(res).toBe('mockDate');
    });
    it('should emit error when userId or code is missing', async () => {
      userIdService.getUserId.mockReturnValue(of(null as any));

      await expect(
        firstValueFrom(
          service.cancelSubscription({ subscriptionEndAt: '2026-01-01' }, undefined)
        )
      ).rejects.toMatchObject({
        message: 'Cannot cancel subscription: missing user ID or subscription code.',
      });
    });
    it('should emit error when userId or subscriptionCode is missing in getEffectiveCancellationDate', async () => {
      userIdService.getUserId.mockReturnValue(of(null as any));

      await expect(
        firstValueFrom(service.getEffectiveCancellationDate(undefined))
      ).rejects.toMatchObject({
        message: 'Cannot fetch cancellation effective date: missing user ID or subscription code.',
      });
    });
  });

  describe('cancelSubscription', () => {
    const cancellationDetails: SubscriptionCancellationDetails = {
      subscriptionEndAt: '2026-01-01',
    };

    it('should call connector with correct params', async () => {
      userIdService.getUserId.mockReturnValue(of(userId));
      cancelConnector.cancelSubscription.mockReturnValue(of('success'));

      const res = await firstValueFrom(
        service.cancelSubscription(cancellationDetails, subscriptionCode)
      );
      expect(cancelConnector.cancelSubscription).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        cancellationDetails
      );
      expect(res).toBe('success');
    });

    it('should emit error when userId or code is missing', async () => {
      userIdService.getUserId.mockReturnValue(of(null as any));

      await expect(
        firstValueFrom(service.cancelSubscription(cancellationDetails, undefined))
      ).rejects.toMatchObject({
        message: 'Cannot cancel subscription: missing user ID or subscription code.',
      });
    });
  });

  describe('reverseCancellation', () => {
    it('should call connector with correct params', async () => {
      userIdService.getUserId.mockReturnValue(of(userId));
      cancelConnector.reverseCancellation.mockReturnValue(of('reversed'));

      const res = await firstValueFrom(
        service.reverseCancellation(subscriptionCode)
      );
      expect(cancelConnector.reverseCancellation).toHaveBeenCalledWith(
        userId,
        subscriptionCode
      );
      expect(res).toBe('reversed');
    });

    it('should emit error when userId or code is missing', async () => {
      userIdService.getUserId.mockReturnValue(of(null as any));

      await expect(
        firstValueFrom(service.reverseCancellation(undefined))
      ).rejects.toMatchObject({
        message: 'Cannot reverse cancellation: missing user ID or subscription code.',
      });
    });
  });

  describe('withdrawSubscription', () => {
    const withdrawalData: SubscriptionWithdraw = {
      subscriptionId: 'sub456',
      version: '1',
      withdrawnAt: '2025-07-01',
      withdrawalPeriodEndDate: '2025-07-15',
    };

    it('should call connector with correct params', async () => {
      userIdService.getUserId.mockReturnValue(of(userId));
      cancelConnector.withdrawSubscription.mockReturnValue(of('withdrawn'));

      const res = await firstValueFrom(
        service.withdrawSubscription(withdrawalData, subscriptionCode)
      );
      expect(cancelConnector.withdrawSubscription).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        withdrawalData
      );
      expect(res).toBe('withdrawn');
    });

    it('should emit error when userId or code is missing', async () => {
      userIdService.getUserId.mockReturnValue(of(null as any));

      await expect(
        firstValueFrom(service.withdrawSubscription(withdrawalData, undefined))
      ).rejects.toMatchObject({
        message: 'Cannot withdraw subscription: missing user ID or subscription code.',
      });
    });
  });
});
