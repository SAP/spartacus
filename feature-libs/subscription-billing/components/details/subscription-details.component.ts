import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
} from '@spartacus/subscription-billing/root';
import {
  combineLatest,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';

import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
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



  protected launchDialogService = inject(LaunchDialogService);
@ViewChild('cancelTriggerEl') cancelTriggerEl: ElementRef;

  ngOnInit() {
    this.subscription = combineLatest([
      this.subscriptionDetails$,
      this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    ])
      .pipe(
        take(1),
        tap(([subscriptionDetails, subscriptionCode]) => {
          if (subscriptionDetails && subscriptionDetails.id !== subscriptionCode) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        })
      )
      .subscribe();
  }
showSubscriptionDialog(mode: 'cancel' | 'withdraw' | 'resubscribe'): void {
  combineLatest([
    this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    this.subscriptionDetails$,
  ])
    .pipe(take(1))
    .subscribe(([code, subscription]) => {
      if (!code || !subscription) return;

      const dataToPass = {
        ...subscription,
        code,
        mode,
      };

      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.SUBSCRIPTION_CONFIRMATION,
        this.cancelTriggerEl,
        dataToPass
      );
    });
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
