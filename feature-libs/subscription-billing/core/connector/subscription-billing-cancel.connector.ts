import { inject, Injectable } from '@angular/core';
import { CancelSubscriptionOrderAdapter } from './subscription-billing-cancel.adapter';
import { Observable } from 'rxjs';
import { CancellationDetails,withdrawal } from '@spartacus/subscription-billing/root';


@Injectable({
  providedIn: 'root',
})
export class CancelSubscriptionOrderConnector {
  protected adapter = inject(CancelSubscriptionOrderAdapter);
  public cancellationSubscriptionEffectiveDate(
    userId: string,
    subscriptionCode: string,
  ): Observable<unknown> {
    return this.adapter.cancellationSubscriptionEffectiveDate(
      userId,
      subscriptionCode
    );
  }
  public cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown> {
    return this.adapter.cancelSubscription(userId, subscriptionCode,cancellationDetails);
  }

  public reversecancellation(
    userId: string,
    subscriptionCode: string,
    // reverseCancellation: reverseCancellation
  ): Observable<unknown> {
    return this.adapter.reverseCancellation(userId, subscriptionCode);
  }
  public withdrawal(
    userId: string,
    subscriptionCode: string,
    withdrawal: withdrawal
  ): Observable<unknown> {
    return this.adapter.withdrawal(userId, subscriptionCode,withdrawal);
  }

}



