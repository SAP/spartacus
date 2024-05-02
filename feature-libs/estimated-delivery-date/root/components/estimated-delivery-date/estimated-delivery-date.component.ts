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
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-estimated-delivery-date',
  templateUrl: './estimated-delivery-date.component.html',
  providers: [CxDatePipe],
})
export class EstimatedDeliveryDateComponent {
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
    protected orderDetailsOrderEntriesContext: OrderDetailsOrderEntriesContext,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translationService: TranslationService,
    protected datePipe: CxDatePipe
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly consignments$: Observable<Consignment> = this.orderHistoryFacade
    .getOrderDetails()
    .pipe(map((order: Order) => order?.consignments ?? []))
    .pipe(switchMap((consignments: Consignment[]) => consignments));

  /**
   * Verifies whether the arrival slots infos (from Order Entry) have any entries.
   * Only in this case we want to display the arrival slot summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the arrival slot information is present for the order
   */
  hasOrderEntryArrivalSlots(item: OrderEntry): boolean {
    const arrivalSlots = item.ArrivalSlots;
    return arrivalSlots != null && arrivalSlots.length > 0;
  }

  /**
   * Verifies whether the arrival slot infos (from Consignment) have any entries.
   * Only in this case we want to display the arrival slot summary
   *
   * @param {Consignment} item - Consignment item
   * @returns {boolean} - whether the arrival slot information is present for the order
   */

  hasConsignmentEntryArrivalSlot(item: Consignment): boolean {
    const arrivalSlot = item.ArrivalSlot;
    return arrivalSlot != null && arrivalSlot.at != null;
  }

  getArrivalSlotInfoId(index: number): string {
    return 'cx-estimated-delivery-date-info-' + index.toString();
  }

  getLongDate(date?: Date) {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date);
  }
}
