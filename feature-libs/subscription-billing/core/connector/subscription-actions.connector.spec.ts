import { TestBed } from '@angular/core/testing';
import { SubscriptionActionsConnector } from './subscription-actions.connector';
import { SubscriptionActionsAdapter } from './subscription-actions.adapter';
import { of, firstValueFrom, throwError } from 'rxjs';
import {
  SubscriptionCancellationDetails,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { vi } from 'vitest';

describe('SubscriptionActionsConnector', () => {
  let connector: SubscriptionActionsConnector;
  let adapter: any;

  beforeEach(() => {
    const adapterSpy = {
      getEffectiveCancellationDate: vi.fn(),
      cancelSubscription: vi.fn(),
      reverseCancellation: vi.fn(),
      withdrawSubscription: vi.fn(),
      extendSubscription: vi.fn(),
      getExtensionEffectiveDate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SubscriptionActionsConnector,
        { provide: SubscriptionActionsAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(SubscriptionActionsConnector);
    adapter = TestBed.inject(SubscriptionActionsAdapter) as any;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('getEffectiveCancellationDate', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ date: '2025-01-01' });

      adapter.getEffectiveCancellationDate.mockReturnValue(expectedResponse);

      const result = connector.getEffectiveCancellationDate(
        userId,
        subscriptionCode
      );
      expect(adapter.getEffectiveCancellationDate).toHaveBeenCalledWith(
        userId,
        subscriptionCode
      );
      expect(result).toBe(expectedResponse);
    });
  });

  describe('getExtensionEffectiveDate', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ subscriptionEndAt: '2025-01-01' });

      adapter.getExtensionEffectiveDate.mockReturnValue(expectedResponse);

      const result = connector.getExtensionEffectiveDate(
        userId,
        subscriptionCode,
        6,
        false
      );
      expect(adapter.getExtensionEffectiveDate).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        6,
        false
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('cancelSubscription', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const cancellationDetails: SubscriptionCancellationDetails = {
        subscriptionEndAt: '2025-08-31',
      };
      const expectedResponse = of({ success: true });

      adapter.cancelSubscription.mockReturnValue(expectedResponse);

      const result = connector.cancelSubscription(
        userId,
        subscriptionCode,
        cancellationDetails
      );
      expect(adapter.cancelSubscription).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        cancellationDetails
      );
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors', async () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const cancellationDetails: SubscriptionCancellationDetails = {
        subscriptionEndAt: '2025-08-31',
      };
      const error = new Error('Cancel error');

      adapter.cancelSubscription.mockReturnValue(throwError(() => error));

      await expect(
        firstValueFrom(
          connector.cancelSubscription(userId, subscriptionCode, cancellationDetails)
        )
      ).rejects.toBe(error);
    });
  });

  describe('extendSubscription', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ success: true });

      adapter.extendSubscription.mockReturnValue(expectedResponse);

      const result = connector.extendSubscription(
        userId,
        subscriptionCode,
        1,
        false
      );
      expect(adapter.extendSubscription).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        1,
        false
      );
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors', async () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const error = new Error('Cancel error');

      adapter.extendSubscription.mockReturnValue(throwError(() => error));

      await expect(
        firstValueFrom(
          connector.extendSubscription(userId, subscriptionCode, 1, false)
        )
      ).rejects.toBe(error);
    });
  });

  describe('reverseCancellation', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ reversed: true });

      adapter.reverseCancellation.mockReturnValue(expectedResponse);

      const result = connector.reverseCancellation(userId, subscriptionCode);
      expect(adapter.reverseCancellation).toHaveBeenCalledWith(
        userId,
        subscriptionCode
      );
      expect(result).toBe(expectedResponse);
    });
  });

  describe('withdrawSubscription', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const withdrawalData: SubscriptionWithdraw = {
        subscriptionId: 'sub123',
        version: '1.0',
        withdrawnAt: '2025-08-25T10:00:00Z',
        withdrawalPeriodEndDate: '2025-09-01',
      };
      const expectedResponse = of({ withdrawn: true });

      adapter.withdrawSubscription.mockReturnValue(expectedResponse);

      const result = connector.withdrawSubscription(
        userId,
        subscriptionCode,
        withdrawalData
      );
      expect(adapter.withdrawSubscription).toHaveBeenCalledWith(
        userId,
        subscriptionCode,
        withdrawalData
      );
      expect(result).toBe(expectedResponse);
    });
  });
});
