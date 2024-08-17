/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderGuard {
  protected orderDetailsService = inject(OrderDetailsService);
  protected globalMessageService = inject(GlobalMessageService);

  canActivate(): Observable<boolean | UrlTree> {
    return this.orderDetailsService.getOrderDetails().pipe(
      map((orderDetails) => {
        if (orderDetails && orderDetails.serviceReschedulable) {
          return true;
        } else {
          this.globalMessageService.add(
            { key: 'rescheduleService.serviceNotReschedulable' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return false;
        }
      })
    );
  }
}
