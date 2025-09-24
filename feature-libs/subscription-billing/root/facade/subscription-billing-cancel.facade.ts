import { Observable } from 'rxjs';
import { CancellationDetails, withdrawal } from '../model';
import { Injectable } from '@angular/core';
import { SUBSCRIPTION_BILLING_FEATURE } from '../feature-name';
import { facadeFactory } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CancelSubscriptionFacade,
      feature: SUBSCRIPTION_BILLING_FEATURE,
      methods: [
        'cancelSubscription',
        'cancellationSubscriptionEffectiveDate',
        'reverseCancellation',
        'withdrawal',
      ],
    }),
})
export abstract class CancelSubscriptionFacade {
  abstract cancelSubscription(
    CancellationDetails: CancellationDetails,
    code?: string
  ): Observable<unknown>;
  abstract cancellationSubscriptionEffectiveDate(code: string): Observable<any>;

  abstract reverseCancellation(code?: string): Observable<unknown>;
  abstract withdrawal(
    withdrawal: withdrawal,
    code?: string
  ): Observable<unknown>;
}
