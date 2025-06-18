/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OrderDetailsService } from '@spartacus/order/components';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cancel-service-order-headline',
  templateUrl: './cancel-service-order-headline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CancelServiceOrderHeadlineComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  order$ = this.orderDetailsService.getOrderDetails().pipe(
    map((order) => ({
      ...order,
      entries: (order.entries || []).filter(
        (entry) => entry.product && entry.product.productTypes === 'SERVICE'
      ),
    }))
  );

  readonly CartOutlets = CartOutlets;
}
