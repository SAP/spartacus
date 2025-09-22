import { TestBed } from '@angular/core/testing';
import { CancelSubscriptionOrderConnector } from './subscription-billing-cancel.connector';
import { CancelSubscriptionOrderAdapter } from './subscription-billing-cancel.adapter';
import { of, throwError } from 'rxjs';
import { CancellationDetails, withdrawal } from '@spartacus/subscription-billing/root';

describe('CancelSubscriptionOrderConnector', () => {
  let connector: CancelSubscriptionOrderConnector;
  let adapter: jasmine.SpyObj<CancelSubscriptionOrderAdapter>;

  beforeEach(() => {
    const adapterSpy = jasmine.createSpyObj('CancelSubscriptionOrderAdapter', [
      'cancellationSubscriptionEffectiveDate',
      'cancelSubscription',
      'reverseCancellation',
      'withdrawal'
    ]);

    TestBed.configureTestingModule({
      providers: [
        CancelSubscriptionOrderConnector,
        { provide: CancelSubscriptionOrderAdapter, useValue: adapterSpy }
      ]
    });

    connector = TestBed.inject(CancelSubscriptionOrderConnector);
    adapter = TestBed.inject(
      CancelSubscriptionOrderAdapter
    ) as jasmine.SpyObj<CancelSubscriptionOrderAdapter>;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('cancellationSubscriptionEffectiveDate', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ date: '2025-01-01' });

      adapter.cancellationSubscriptionEffectiveDate.and.returnValue(expectedResponse);

      const result = connector.cancellationSubscriptionEffectiveDate(userId, subscriptionCode);
      expect(adapter.cancellationSubscriptionEffectiveDate).toHaveBeenCalledWith(userId, subscriptionCode);
      expect(result).toBe(expectedResponse);
    });
  });

  describe('cancelSubscription', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const cancellationDetails: CancellationDetails = {
       subscriptionEndAt: '2025-08-31'
      };
      const expectedResponse = of({ success: true });

      adapter.cancelSubscription.and.returnValue(expectedResponse);

      const result = connector.cancelSubscription(userId, subscriptionCode, cancellationDetails);
      expect(adapter.cancelSubscription).toHaveBeenCalledWith(userId, subscriptionCode, cancellationDetails);
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors', (done) => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const cancellationDetails: CancellationDetails = {
        subscriptionEndAt: '2025-08-31'
      };
      const error = new Error('Cancel error');

      adapter.cancelSubscription.and.returnValue(throwError(() => error));

      connector.cancelSubscription(userId, subscriptionCode, cancellationDetails).subscribe({
        error: (e) => {
          expect(e).toBe(error);
          done();
        }
      });
    });
  });

  describe('reversecancellation', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const expectedResponse = of({ reversed: true });

      adapter.reverseCancellation.and.returnValue(expectedResponse);

      const result = connector.reversecancellation(userId, subscriptionCode);
      expect(adapter.reverseCancellation).toHaveBeenCalledWith(userId, subscriptionCode);
      expect(result).toBe(expectedResponse);
    });
  });

  describe('withdrawal', () => {
    it('should delegate to adapter', () => {
      const userId = 'user123';
      const subscriptionCode = 'subABC';
      const withdrawalData: withdrawal = {
       subscriptionId: 'sub123',
  version: '1.0',
  withdrawnAt: '2025-08-25T10:00:00Z',
  withdrawalPeriodEndDate: '2025-09-01'
      };
      const expectedResponse = of({ withdrawn: true });

      adapter.withdrawal.and.returnValue(expectedResponse);

      const result = connector.withdrawal(userId, subscriptionCode, withdrawalData);
      expect(adapter.withdrawal).toHaveBeenCalledWith(userId, subscriptionCode, withdrawalData);
      expect(result).toBe(expectedResponse);
    });
  });
});
