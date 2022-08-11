import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthRedirectService,
  AuthService,
  AuthStorageService,
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
    protected authStorageService: AuthStorageService,
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

    let req = super.alterRequest(request, token);

    if (!hasAuthorizationHeader && isCSAgentRequest) {
      req = request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(token),
        },
      });
      return InterceptorUtil.removeHeader(
        USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
        req
      );
    }
    return req;
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
