/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AuthService,
  getLastValueSync,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotCheckoutAuthGuard {
  protected authService = inject(AuthService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);


  canActivate(): Observable<GuardResult> {
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return this.router.parseUrl(
            this.semanticPathService.get('home') ?? ''
          );
        } else if (!!getLastValueSync(this.activeCartFacade.isGuestCart())) {
          return this.router.parseUrl(
            this.semanticPathService.get('cart') ?? ''
          );
        }
        return !isLoggedIn;
      })
    );
  }
}
