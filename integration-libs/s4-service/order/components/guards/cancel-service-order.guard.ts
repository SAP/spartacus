/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CancelServiceOrderGuard {
  protected orderDetailsService = inject(OrderDetailsService);
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);

  canActivate(): Observable<boolean | UrlTree> {
    return this.orderDetailsService.getOrderDetails().pipe(
      map((orderDetails) => {
        if (
          orderDetails &&
          Object.keys(orderDetails).length > 0 &&
          orderDetails.serviceCancellable
        ) {
          return true;
        } else {
          return this.router.parseUrl(
            this.semanticPathService.get('orders') ?? ''
          );
        }
      })
    );
  }
}
