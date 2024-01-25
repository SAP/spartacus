/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
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
export class NotCheckoutAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
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
