/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class S4ServiceOrderDetailActionsComponent extends OrderDetailActionsComponent {
  protected checkServiceStatus(order: Order): boolean {
    if (order && order.status === 'CANCELLED') {
      return false;
    } else {
      return true;
    }
  }
}
