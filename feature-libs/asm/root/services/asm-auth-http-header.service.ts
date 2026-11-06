/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthRedirectService,
  AuthService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  InterceptorUtil,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';
import { CsAgentAuthService } from './csagent-auth.service';

/**
 * Overrides `AuthHttpHeaderService` to handle asm calls as well (not only OCC)
 * in cases of normal user session and on customer emulation.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmAuthHttpHeaderService extends AuthHttpHeaderService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AsmAuthStorageService,
    protected csAgentAuthService: CsAgentAuthService,
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
   * Checks if the authorization header should be added to the request
   *
   *  @override
   */
  public shouldAddAuthorizationHeader(request: HttpRequest<any>): boolean {
    return (
      super.shouldAddAuthorizationHeader(request) ||
      this.isCSAgentTokenRequest(request)
    );
  }

  /**
   * @override
   *
   * Checks if particular request should be handled by this service.
   */
  public shouldCatchError(request: HttpRequest<any>): boolean {
    return (
      super.shouldCatchError(request) || this.isCSAgentTokenRequest(request)
    );
  }

  /**
   * @override
   *
   * Adds `Authorization` header to occ and CS agent requests.
   * For CS agent requests also removes the `cx-use-csagent-token` header (to avoid problems with CORS).
   */
  public alterRequest(
    request: HttpRequest<any>,
    token?: AuthToken
  ): HttpRequest<any> {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isCSAgentRequest = this.isCSAgentTokenRequest(request);
    const tokenForRequest = this.getTokenForRequest(request, token);

    let req = super.alterRequest(request, tokenForRequest);

    if (!hasAuthorizationHeader && isCSAgentRequest) {
      req = request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(tokenForRequest),
        },
      });
      return InterceptorUtil.removeHeader(
        USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
        req
      );
    }
    return req;
  }

  protected getTokenForRequest(
    request: HttpRequest<any>,
    token?: AuthToken
  ): AuthToken | undefined {
    if (this.shouldUseEmulatedUserToken(request)) {
      return this.authStorageService.getEmulatedUserToken();
    }
    return token;
  }

  protected shouldUseEmulatedUserToken(request: HttpRequest<any>): boolean {
    if (this.isCSAgentTokenRequest(request)) {
      return false;
    }

    let tokenTarget: TokenTarget | undefined;
    this.authStorageService
      .getTokenTarget()
      .subscribe((target) => (tokenTarget = target))
      .unsubscribe();

    return Boolean(
      tokenTarget === TokenTarget.CSAgent &&
        this.authStorageService.getEmulatedUserToken()?.access_token
    );
  }

  protected isCSAgentTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestWithCSAgentToken = InterceptorUtil.getInterceptorParam(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestWithCSAgentToken);
  }

  /**
   * @override
   *
   * On backend errors indicating expired `refresh_token` we need to logout
   * currently logged in user and CS agent.
   */
  public handleExpiredRefreshToken(): void {
    this.csAgentAuthService
      .isCustomerSupportAgentLoggedIn()
      .pipe(take(1))
      .subscribe((csAgentLoggedIn) => {
        if (csAgentLoggedIn) {
          this.authService.setLogoutProgress(true);
          this.csAgentAuthService.logoutCustomerSupportAgent();
          this.globalMessageService.add(
            {
              key: 'asm.csagentTokenExpired',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        } else {
          super.handleExpiredRefreshToken();
        }
      });
  }
}
