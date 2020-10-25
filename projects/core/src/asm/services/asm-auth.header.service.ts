import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { AuthHeaderService } from '../../auth/user-auth/services/auth-header.service';
import { AuthStorageService } from '../../auth/user-auth/services/auth-storage.service';
import { OAuthLibWrapperService } from '../../auth/user-auth/services/oauth-lib-wrapper.service';
import { GlobalMessageService } from '../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { RoutingService } from '../../routing/facade/routing.service';
import { CsAgentAuthService } from '../facade/csagent-auth.service';

/**
 * Overrides `AuthHeaderService` to handle asm calls as well (not only OCC)
 * in cases of normal user session and on customer emulation.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmAuthHeaderService extends AuthHeaderService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected csAgentAuthService: CsAgentAuthService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService
  ) {
    super(
      authService,
      authStorageService,
      oAuthLibWrapperService,
      routingService,
      occEndpointsService,
      globalMessageService
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
  public alterRequest(request: HttpRequest<any>): HttpRequest<any> {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isCSAgentRequest = this.isCSAgentTokenRequest(request);

    let req = super.alterRequest(request);

    if (!hasAuthorizationHeader && isCSAgentRequest) {
      req = request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(),
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
