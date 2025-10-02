/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent, Order } from '@spartacus/order/root';
import { OrderDetailActionsComponent } from '../../order-detail-actions/order-detail-actions.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-my-account-v2-order-details-actions',
    templateUrl: './my-account-v2-order-details-actions.component.html',
    imports: [
        NgIf,
        RouterLink,
        TranslatePipe,
        UrlPipe,
        MockTranslatePipe,
    ],
})
export class MyAccountV2OrderDetailsActionsComponent
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
