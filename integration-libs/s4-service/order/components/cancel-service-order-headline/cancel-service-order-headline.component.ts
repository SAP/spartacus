/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { ProductTypes, TranslatePipe } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { OutletDirective } from '@spartacus/storefront';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cancel-service-order-headline',
  templateUrl: './cancel-service-order-headline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, OutletDirective, AsyncPipe, DatePipe, TranslatePipe],
})
export class CancelServiceOrderHeadlineComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  order$ = this.orderDetailsService.getOrderDetails().pipe(
    map((order) => ({
      ...order,
      entries: (order.entries || []).filter(
        (entry) =>
          entry.product && entry.product.productTypes === ProductTypes.SERVICE
      ),
    }))
  );

  readonly CartOutlets = CartOutlets;
}
