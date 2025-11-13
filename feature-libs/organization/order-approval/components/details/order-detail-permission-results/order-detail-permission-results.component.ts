/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDetailPermissionResultsComponent {
  protected orderDetailsService = inject(OrderDetailsService);

  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    useFeatureStyles('a11yTableHeaderReadout');
  }
}
