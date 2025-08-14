import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  EventService,
  I18nModule,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
  SubscriptionStatus,
} from '@spartacus/subscription-billing/root';
import {
  combineLatest,
  map,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
})
export class SubscriptionDetailsComponent implements OnDestroy, OnInit {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected subscription = new Subscription();
  protected routingService = inject(RoutingService);

  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();
  getSubscriptionCodeFromRoute(): Observable<string | undefined> {
    return this.routingService.getRouterState().pipe(
      map((route) => {
        const guidPattern = /\/subscription\/([^/?#]+)/;
        const match = route.state.url.match(guidPattern);
        return match ? match[1] : undefined;
      })
    );
  }
  ngOnInit() {
    this.subscription = combineLatest([
      this.subscriptionDetails$,
      this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    ])
      .pipe(
        take(1),
        tap(([subscription, subscriptionCode]) => {
          if (subscription && subscription.id !== subscriptionCode) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        })
      )
      .subscribe();
  }
  isSubscriptionActive(status: string | undefined) {
    return status?.toUpperCase() === SubscriptionStatus.active ? true : false;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
