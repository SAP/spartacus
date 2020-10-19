import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { AuthHeaderService } from '../../auth/user-auth/services/auth-header.service';
import { GlobalMessageService } from '../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { RoutingService } from '../../routing/facade/routing.service';
import { CsAgentAuthService } from '../facade/csagent-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthHeaderService extends AuthHeaderService {
  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected cxOAuthService: CxOAuthService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService
  ) {
    super(authService, cxOAuthService, routingService, occEndpointsService);
  }

  public shouldCatchError(request: HttpRequest<any>): boolean {
    return (
      super.shouldCatchError(request) || this.isCSAgentTokenRequest(request)
    );
  }

  /**
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
   * On backend errors indicating expired `refresh_token` we need to logout
   * currently logged in user.
   */
  public handleExpiredRefreshToken(): void {
    let csAgentLoggedIn;
    this.csAgentAuthService
      .isCustomerSupportAgentLoggedIn()
      .subscribe((loggedIn) => (csAgentLoggedIn = loggedIn))
      .unsubscribe();
    // Logout user
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
  }
}
