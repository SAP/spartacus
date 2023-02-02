/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-detail-billing',
  templateUrl: './order-detail-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailBillingComponent {
  readonly cartOutlets = CartOutlets;

  order$: Observable<Order | undefined> =
    this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
