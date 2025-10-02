/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeatureDirective } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FeatureDirective,
    NgFor,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class OrderDetailPermissionResultsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {
    useFeatureStyles('a11yTableHeaderReadout');
  }
}
