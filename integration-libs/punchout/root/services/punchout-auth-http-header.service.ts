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
  GlobalMessageType,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_OCC_API_URL_SEGMENT,
  PUNCHOUT_SESSION_KEY,
  PUNCHOUT_SESSION_PAGE_URL,
} from '../model';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAuthHttpHeaderService extends AuthHttpHeaderService {
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected punchoutStoreService = inject(PunchoutStoreService);
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
   * On backend errors indicating expired `refresh_token`, we need to silently logout
   * by revoking invalid token and preventing Login page redirection.
   * This rule is applied on punchout instance: punchoutSessionId in storage or browser on PunchoutSession page
   * It is a workaround to address CXSPA-9608 - Public pages not displayed when token is invalid.
   * To be removed once CXSPA-9608 is closed.
   */
  public handleExpiredRefreshToken(): void {
    if (
      this.punchoutDetectionService.isPunchoutSessionPage() ||
      !!this.punchoutStoreService.getPunchoutSessionId()
    ) {
      this.silentLogout();
    } else {
      super.handleExpiredRefreshToken();
    }
  }

  /**
   * @override
   * Refreshes access_token and then retries the call with the new token.
   * When url is a Punchout OCC call, redirect to PunchoutSession page to refresh the auth token.
   */
  public handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    initialToken: AuthToken | undefined
  ): Observable<HttpEvent<AuthToken>> {
    if (this.isPunchoutOccApiRequest(request)) {
      this.goToPunchoutPage();
    }
    return super.handleExpiredAccessToken(request, next, initialToken);
  }

  protected silentLogout(): void {
    this.authService.coreLogout().finally(() => {
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
    });
  }

  protected isPunchoutOccApiRequest(request: HttpRequest<any>): boolean {
    return request.url.includes(PUNCHOUT_OCC_API_URL_SEGMENT);
  }

  protected buildPunchoutSessionUrl(punchoutSessionId: string): string {
    return `${PUNCHOUT_SESSION_PAGE_URL}?${PUNCHOUT_SESSION_KEY}=${punchoutSessionId}`;
  }

  protected goToPunchoutPage(): void {
    const punchoutSessionId = this.punchoutStoreService.getPunchoutSessionId();
    this.routingService.goByUrl(
      punchoutSessionId
        ? this.buildPunchoutSessionUrl(punchoutSessionId)
        : PUNCHOUT_ERROR_PAGE_URL
    );
  }
}
