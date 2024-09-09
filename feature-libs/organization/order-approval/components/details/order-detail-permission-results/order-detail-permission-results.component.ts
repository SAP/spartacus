/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { I18nModule } from '@spartacus/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-order-detail-permission-results',
    templateUrl: './order-detail-permission-results.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        I18nModule,
    ],
})
export class OrderDetailPermissionResultsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
