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
  SubscriptionStatus,
} from '@spartacus/subscription-billing/root';
import { combineLatest, filter, map, Observable, Subscription, take, tap } from 'rxjs';

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
  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();

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

  isSubscriptionActive(status: string | undefined) {
    return status?.toUpperCase() === SubscriptionStatus.active ? true : false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
