/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailPermissionResultsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
