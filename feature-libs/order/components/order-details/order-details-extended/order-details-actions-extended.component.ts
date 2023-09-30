/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent, Order } from '@spartacus/order/root';
import { OrderDetailActionsComponent } from '../order-detail-actions/order-detail-actions.component';

@Component({
  selector: 'cx-order-details-actions-extended',
  templateUrl: './order-details-actions-extended.component.html',
})
export class OrderDetailsActionsExtendedComponent
  extends OrderDetailActionsComponent
  implements OnInit
{
  order: Order;
  protected eventService = inject(EventService);

  ngOnInit(): void {
    this.order$.subscribe((order) => {
      this.order = order;
    });
  }
  showDialog(order: Order) {
    const newEvent = new DownloadOrderInvoicesEvent();
    newEvent.order = order;
    this.eventService.dispatch(newEvent);
  }
}
