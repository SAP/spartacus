/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCancellationService } from './order-cancellation.service';

@Injectable({
  providedIn: 'root',
})
export class OrderCancellationGuard {
  protected orderAmendService = inject(OrderCancellationService);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  canActivate(): Observable<GuardResult> {
    return this.orderAmendService.getForm().pipe(
      map((form) => {
        if (!form.valid) {
          // the order code is not available in the route
          // as long as we're inside a guard, hence we redirect
          // to the common orders page.
          return this.router.parseUrl(
            this.semanticPathService.get('orders') ?? ''
          );
        } else {
          return true;
        }
      })
    );
  }
}
