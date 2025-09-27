import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { combineLatest, Observable, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnDestroy, OnInit {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected subscription = new Subscription();

  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();

  ngOnInit() {
    this.subscription = combineLatest([
      this.subscriptionDetails$,
      this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    ])
      .pipe(
        take(1),
        tap(([subscriptionDetails, subscriptionCode]) => {
          if (
            subscriptionDetails &&
            subscriptionDetails.id !== subscriptionCode
          ) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
