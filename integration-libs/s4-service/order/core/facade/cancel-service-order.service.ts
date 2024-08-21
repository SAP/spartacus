/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CancelServiceOrderConnector } from '../connector';
import {
  CancellationDetails,
  CancelServiceOrderFacade,
} from '@spartacus/s4-service/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CancelServiceOrderService implements CancelServiceOrderFacade {
  protected cancelServiceOrderConnector = inject(CancelServiceOrderConnector);
  protected orderHistoryFacade = inject(OrderHistoryFacade);
  protected userIdService = inject(UserIdService);
  cancelService(orderCode: string, cancellationDetails: CancellationDetails) {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.cancelServiceOrderConnector.cancelServiceOrder(
          userId,
          orderCode,
          cancellationDetails
        );
      })
    );
  }

  loadOrderDetails() {
    return this.orderHistoryFacade.getOrderDetails();
  }
}
