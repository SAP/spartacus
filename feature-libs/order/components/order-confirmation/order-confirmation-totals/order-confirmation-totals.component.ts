/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderConfirmationTotalsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  order$: Observable<Order | undefined> = this.orderFacade.getOrderDetails();

  constructor(protected orderFacade: OrderFacade) {
    useFeatureStyles('a11yWideScreenImprovements');
  }

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
