/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FederatedLoginService } from '../../../federated-login/services/federated-login.service';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { WindowRef } from '../../../window/window-ref';
import { AuthFlowRoutesService } from '../services/auth-flow-routes.service';

/**
 * Protects routes on the federated login domain.
 *
 * When the current domain is a federated login domain (i.e. `FederatedLoginService.isLoginDomain`
 * is true), only routes whose Spartacus routing config entry has `authFlow: true` are accessible.
 * Any attempt to navigate to a non-auth-flow route is redirected to the equivalent page on the
 * origin storefront, falling back to the Spartacus `home` route when no origin is available.
 */
@Injectable({
  providedIn: 'root',
})
export class FederatedLoginGuard implements CanActivate {
  protected federatedLoginService = inject(FederatedLoginService);
  protected authFlowRoutesService = inject(AuthFlowRoutesService);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);
  protected windowRef = inject(WindowRef);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    if (
      this.federatedLoginService.enabled &&
      this.federatedLoginService.isLoginDomain
    ) {
      if (!this.federatedLoginService.origin) {
        return this.handleInvalidSiteContext(route, state);
      }

      if (!this.isValidRoute(route, state)) {
        return this.handleInvalidRoute(route, state);
      }
    }

    return of(true);
  }

  /**
   * Determines if route should be served on the login domain.
   *
   * Default is only routes configured with `authFlow` set to `true`.
   */
  protected isValidRoute(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authFlowRoutesService.isAuthFlow(state.url);
  }

  /**
   * Handles attempts to visit a an invalid route on the login domain.
   */
  protected handleInvalidRoute(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    // redirect to origin
    this.windowRef.location.href = new URL(
      state.url,
      this.federatedLoginService.origin
    ).href;

    return of(false);
  }

  /**
   * Determines what to do for a route when there is a valid base site but no origin context available.
   *
   * Default behavior will attempt to route to `{ cxRoute: 'notFound' }`.
   */
  protected handleInvalidSiteContext(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    const destination = this.semanticPathService.get('notFound') ?? '';

    // avoid infinite loop
    if (state.url === destination) {
      return of(true);
    }

    return of(this.router.parseUrl(destination));
  }
}
