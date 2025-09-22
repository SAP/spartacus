/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  EventService,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  I18nModule,
  RoutingService,
  TranslationService,
  UrlModule,
} from '@spartacus/core';
import { Card, LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
  withdrawal,
  CancelSubscriptionFacade,
  CancelPopupEvent,
  CancelData,
  // SubscriptionStatus,
} from '@spartacus/subscription-billing/root';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
  throwError,
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
  protected translation = inject(TranslationService);
  protected launchDialogService = inject(LaunchDialogService);
  @ViewChild('extendSubscriptionBtn') extendSubscriptionBtn: ElementRef;
  subscriptionContractFrequency: string;

  protected subscriptionCancelFacade = inject(CancelSubscriptionFacade);
  protected globalMessageService = inject(GlobalMessageService);


  //comented for now
  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();


//Added for check
  // subscriptionDetails$: Observable<SubscriptionDetail> = this.subscriptionFacade.getSubscriptionByCode().pipe(
  //   map((data) => data ?? this.fallbackSubscription)
  // );
//Added for check
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
        take(2),
        tap(([subscriptionDetails, subscriptionCode]) => {
          if (
            subscriptionDetails &&
            subscriptionDetails.id !== subscriptionCode
          ) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        }),
        tap(([subscription, _]) => {
          this.subscriptionContractFrequency =
            subscription?.contractFrequency || '';
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

  getIdContent(subscriptionCode: string | undefined): Observable<Card> {
    return this.translation.translate('subscriptionDetails.id').pipe(
      filter(() => Boolean(subscriptionCode)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [subscriptionCode],
          }) as Card
      )
    );
  }
  getStartDateContent(isoDate: string | null): Observable<Card> {
    return this.translation.translate('subscriptionDetails.startDate').pipe(
      filter(() => Boolean(isoDate)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [isoDate],
          }) as Card
      )
    );
  }
  getEndDateContent(isoDate: string | null): Observable<Card> {
    return this.translation.translate('subscriptionDetails.endDate').pipe(
      filter(() => Boolean(isoDate)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [isoDate],
          }) as Card
      )
    );
  }
  getStatusContent(status: string | undefined): Observable<Card> {
    return this.translation.translate('subscriptionDetails.status').pipe(
      filter(() => Boolean(status)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [status],
          }) as Card
      )
    );
  }

  showExtendSubscriptionDialog() {
    this.launchDialogService
      .openDialogAndSubscribe(
        LAUNCH_CALLER.EXTEND_SUBSCRIPTION,
        this.extendSubscriptionBtn,
        this.subscriptionContractFrequency
      );
  }

  /* isSubscriptionActive(status: string | undefined) {
    return status?.toUpperCase() === SubscriptionStatus.active ? true : false;
  } */





  shouldShowWithdrawal(subscription: any): boolean {
    const isActive =
      subscription.subscriptionStatus?.toUpperCase() === 'ACTIVE';
    const endDate = subscription.withdrawalPeriodEndAt;
    return isActive && !!endDate && new Date(endDate) > new Date();
  }

  withdrawal(): void {
    combineLatest([
      this.getSubscriptionCodeFromRoute(),
      this.subscriptionDetails$,
    ])
      .pipe(
        take(1),
        switchMap(([code, subscription]) => {
          const payload: withdrawal = {
            subscriptionId: subscription?.id,
          };

          return this.subscriptionCancelFacade.withdrawal(payload, code).pipe(
            catchError((err) => {
              this.onError();
              return throwError(() => err);
            })
          );
        })
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'cancelSubscription.withdrawSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
        },
        error: () => this.onError(),
      });
    }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.launchDialogService.closeDialog('Moved away from subscription details page');
  }

  onResubscribe(): void {
    combineLatest([
      this.getSubscriptionCodeFromRoute(),
      // this.subscriptionDetails$,
    ])
      .pipe(
        take(1),
        switchMap(([code]) => {
          return this.subscriptionCancelFacade.reverseCancellation(code).pipe(
            catchError((err) => {
              this.onError();
              return throwError(() => err);
            })
          );
        })
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'cancelSubscription.reverseCancellationSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
        },
        error: () => this.onError(),
      });
  }
  protected onError(): void {
    this.globalMessageService.add(
      { key: 'cancelSubscription.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  //Popup

protected featureConfigService = inject(FeatureConfigService);

@ViewChild('cancelTriggerEl', { static: false })
cancelTriggerEl?: ElementRef;
openCancelPopup(): void {
  const newEvent = new CancelPopupEvent();

  if (
    this.featureConfigService.isEnabled('a11yDialogTriggerRefocus') &&
    this.cancelTriggerEl
  ) {
    newEvent.triggerElementRef = this.cancelTriggerEl;
  }

  combineLatest([
    this.getSubscriptionCodeFromRoute(),
    this.subscriptionDetails$,
  ])
    .pipe(
      take(1),
      switchMap(([code, subscription]) => {
        if (!code || !subscription) return [];
        return this.subscriptionCancelFacade
          .cancellationSubscriptionEffectiveDate(code)
          .pipe(
            catchError(() =>
              [this.fallbackCancelData]
            ),
            map((cancelData) => ({
              subscription,
              cancelData: cancelData,
              code
            }))
          );
      })
    )
    .subscribe(({ subscription, cancelData,code }) => {
      newEvent.data = {
        ...subscription,
        cancelData,
        code
      };

      this.eventService.dispatch(newEvent);
    });
}

// fallback
readonly fallbackCancelData: CancelData = {
  // validTillDate: '31-01-2020',
  // endDate: '2024-08-06T12:47:28+05:30',
  subscriptionEndAt:'2026-02-01T05:00:00+0000'
};


/* ngOnDestroy(): void {
  this.subscription?.unsubscribe();
} */
}
