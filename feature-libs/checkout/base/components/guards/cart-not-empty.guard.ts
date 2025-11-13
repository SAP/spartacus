/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  canActivate(): Observable<GuardResult> {
    return this.activeCartFacade.takeActive().pipe(
      map((cart) => {
        if (this.isEmpty(cart)) {
          return this.router.parseUrl(
            this.semanticPathService.get('home') ?? ''
          );
        }
        return true;
      })
    );
  }

  private isEmpty(cart: Cart): boolean {
    return cart && !cart.totalItems;
  }
}
