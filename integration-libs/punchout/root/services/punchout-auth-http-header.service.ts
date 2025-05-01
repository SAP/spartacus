/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  AuthToken,
  GlobalMessageService,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAuthHttpHeaderService extends AuthHttpHeaderService {
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected punchoutFacade = inject(PunchoutFacade);
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService,
    protected authRedirectService: AuthRedirectService
  ) {
    super(
      authService,
      authStorageService,
      oAuthLibWrapperService,
      routingService,
      occEndpointsService,
      globalMessageService,
      authRedirectService
    );
  }

  /**
   * @override
   *
   * On backend errors indicating expired `refresh_token`, punchout session gets ended, user is redirected to login page
   * It is a workaround to address CXSPA-9608 - Public pages not displayed when token is invalid.
   * To be removed once CXSPA-9608 is closed.
   */
  public handleExpiredRefreshToken(): void {
    if (
      this.punchoutDetectionService.isPunchoutSession() ||
      this.punchoutDetectionService.isPunchoutSessionPage()
    ) {
      this.punchoutFacade.logoutPunchoutUser(true).subscribe();
    } else {
      super.handleExpiredRefreshToken();
    }
  }

  /**
   * @override
   * Refreshes access_token and then retries the call with the new token.
   * When punchout session exists,  punchout session gets ended, user is redirected to login page
   */
  public handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    initialToken: AuthToken | undefined
  ): Observable<HttpEvent<AuthToken>> {
    if (
      this.punchoutDetectionService.isPunchoutSession() ||
      this.punchoutDetectionService.isPunchoutSessionPage()
    ) {
      this.punchoutFacade.logoutPunchoutUser(true).subscribe();
    }
    return super.handleExpiredAccessToken(request, next, initialToken);
  }
}
