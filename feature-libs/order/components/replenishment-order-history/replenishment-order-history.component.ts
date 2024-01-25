/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
  ReplenishmentOrderList,
} from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-history',
  templateUrl: './replenishment-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderHistoryComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  private PAGE_SIZE = 5;
  sortType: string;

  replenishmentOrders$: Observable<ReplenishmentOrderList | undefined> =
    this.replenishmentOrderHistoryFacade
      .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
      .pipe(
        tap((replenishmentOrders: ReplenishmentOrderList | undefined) => {
          if (replenishmentOrders?.pagination?.sort) {
            this.sortType = replenishmentOrders.pagination.sort;
          }
        })
      );

  isLoaded$: Observable<boolean> =
    this.replenishmentOrderHistoryFacade.getReplenishmentOrderHistoryListSuccess();

  constructor(
    protected routing: RoutingService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    protected translation: TranslationService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchReplenishmentOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchReplenishmentOrders(event);
  }

  goToOrderDetail(order: ReplenishmentOrder): void {
    this.routing.go({
      cxRoute: 'replenishmentDetails',
      params: order,
    });
  }

  getSortLabels(): Observable<{
    byDate: string;
    byReplenishmentNumber: string;
    byNextOrderDate: string;
  }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.replenishmentNumber'),
      this.translation.translate('sorting.nextOrderDate'),
    ]).pipe(
      map(([textByDate, textByOrderNumber, textbyNextOrderDate]) => {
        return {
          byDate: textByDate,
          byReplenishmentNumber: textByOrderNumber,
          byNextOrderDate: textbyNextOrderDate,
        };
      })
    );
  }

  openDialog(event: Event, replenishmentOrderCode: string): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REPLENISHMENT_ORDER,
      this.element,
      this.vcr,
      replenishmentOrderCode
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }

  private fetchReplenishmentOrders(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.replenishmentOrderHistoryFacade.loadReplenishmentOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.replenishmentOrderHistoryFacade.clearReplenishmentOrderList();
  }
}
