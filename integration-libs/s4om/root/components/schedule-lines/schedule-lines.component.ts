/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Optional } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { OrderDetailsOrderEntriesContext } from '@spartacus/order/components';
import { Consignment, Order, OrderHistoryFacade } from '@spartacus/order/root';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-schedule-lines',
  templateUrl: './schedule-lines.component.html',
  providers: [CxDatePipe],
})
export class ScheduleLinesComponent {
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
    protected orderDetailsOrderEntriesContext: OrderDetailsOrderEntriesContext,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translationService: TranslationService,
    protected datePipe: CxDatePipe
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  consignments$: Observable<Consignment[]> = this.orderHistoryFacade
    .getOrderDetails()
    .pipe(map((order: Order) => order?.consignments ?? []));
  /**
   * Verifies whether the Schedule Line infos (from Order Entry) have any entries.
   * Only in this case we want to display the schedule line summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the Schedule Line information is present for the order
   */
  hasOrderEntryScheduleLines(item: OrderEntry): boolean {
    const scheduleLines = item.arrivalSlots;
    return scheduleLines != null && scheduleLines.length > 0;
  }

  /**
   * Verifies whether the Schedule Line infos (from Consignment) have any entries.
   * Only in this case we want to display the schedule line summary
   *
   * @param {Consignment[]} items - Consignment array
   * @returns {boolean} - whether the Schedule Line information is present for the order
   */

  hasConsignmentEntryScheduleLines(items: Consignment[]): boolean {
    const scheduleLines = items[0]?.arrivalSlot;
    return scheduleLines != null && scheduleLines.at != null;
  }

  getScheduleLineInfoId(index: number): string {
    return 'cx-schedule-line-info-' + index.toString();
  }

  getLongDate(date?: Date) {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date);
  }
}
