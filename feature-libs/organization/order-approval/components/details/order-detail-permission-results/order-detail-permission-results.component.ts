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
import { FeatureDirective } from '../../../../../../projects/core/src/features-config/directives/feature.directive';
import { TranslatePipe } from '../../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
