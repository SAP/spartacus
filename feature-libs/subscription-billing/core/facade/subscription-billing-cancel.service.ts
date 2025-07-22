import { inject, Injectable } from '@angular/core';
import {
  QueryNotifier,
  QueryService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  CancelSubscriptionFacade,
  CancellationDetails,
  withdrawal
} from '@spartacus/subscription-billing/root';
import { Observable,switchMap, take, combineLatest, of } from 'rxjs';
import { SubscriptionBillingConnector } from '../connector';
import { CancelSubscriptionOrderConnector } from '../connector';

@Injectable()
export class SubscriptionBillingCancelService implements CancelSubscriptionFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionBillingConnector = inject(SubscriptionBillingConnector);
  protected cancelSubscriptionOrderConnector = inject(CancelSubscriptionOrderConnector);
  protected routingService = inject(RoutingService);

  protected getSubscriptionByCodeReloadEvents(): QueryNotifier[] {
    return [GetSubscriptionByCodeReloadEvent];
  }

  cancellationSubscriptionEffectiveDate(subscriptionCode?: string): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error('Cannot fetch cancellation effective date: missing user ID or subscription code.');
        }
        return this.cancelSubscriptionOrderConnector.cancellationSubscriptionEffectiveDate(userId, code);
      })
    );
  }

  cancelSubscription(
    cancellationDetails: CancellationDetails,
    subscriptionCode?: string
  ): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error('Cannot cancel subscription: missing user ID or subscription code.');
        }
        return this.cancelSubscriptionOrderConnector.cancelSubscription(userId, code, cancellationDetails);
      })
    );
  }


  reverseCancellation(
    // reverseCancellation: reverseCancellation,
    subscriptionCode?: string
  ): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error('Cannot reverse cancellation: missing user ID or subscription code.');
        }
        return this.cancelSubscriptionOrderConnector.reversecancellation(userId, code);
      })
    );
  }

  withdrawal(
    withdrawal: withdrawal,
    subscriptionCode?: string
  ): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error('Cannot withdraw subscription: missing user ID or subscription code.');
        }
        return this.cancelSubscriptionOrderConnector.withdrawal(userId, code, withdrawal);
      })
    );
  }


}
