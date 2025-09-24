import {
  CancellationDetails,
  withdrawal,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class CancelSubscriptionOrderAdapter {
  abstract cancellationSubscriptionEffectiveDate(
    userId: string,
    subscriptionCode: string
  ): Observable<any>;
  abstract cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown>;

  abstract reverseCancellation(
    userId: string,
    subscriptionCode: string
  ) // reverseCancellation: reverseCancellation
  : Observable<unknown>;

  abstract withdrawal(
    userId: string,
    subscriptionCode: string,
    withdrawal: withdrawal
  ): Observable<unknown>;
}
