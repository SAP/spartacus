/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class S4ServiceOrderDetailActionsComponent extends OrderDetailActionsComponent {
  protected globalMessageService = inject(GlobalMessageService);

  displayActions$: Observable<boolean> = this.order$.pipe(
    map((order) => this.checkServiceStatus(order))
  );

  protected checkServiceStatus(order: Order): boolean {
    if (order && order.status === 'CANCELLED') {
      return false;
    } else {
      return true;
    }
  }
}
