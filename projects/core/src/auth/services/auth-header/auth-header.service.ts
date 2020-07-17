import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsmAuthService } from 'projects/core/src/asm';
import { RoutingService } from 'projects/core/src/routing';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../../occ/utils/interceptor-util';
import { AuthService } from '../../facade/auth.service';
import { CxOAuthService } from '../../facade/cx-oauth-service';
import { UserToken } from '../../models/token-types.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  constructor(
    public authService: AuthService,
    public asmAuthService: AsmAuthService,
    public oAuthService: CxOAuthService,
    public routingService: RoutingService,
    public globalMessageService: GlobalMessageService
  ) {}
  // TODO: Rethink if maybe it's better to use authStorage directly for the tokens

  isClientTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestWithClientToken = InterceptorUtil.getInterceptorParam(
      USE_CLIENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestWithClientToken);
  }

  isCSAgentTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestWithCSAgentToken = InterceptorUtil.getInterceptorParam(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestWithCSAgentToken);
  }

  getAuthorizationHeader(request: HttpRequest<any>): string {
    const rawValue = request.headers.get('Authorization');
    return rawValue;
  }

  createAuthorizationHeader(csAgent: boolean): any {
    let token;
    if (csAgent) {
      this.asmAuthService
        .getCustomerSupportAgentToken()
        .pipe(take(1))
        .subscribe((tok) => (token = tok));
    } else {
      this.authService
        .getUserToken()
        .pipe(take(1))
        .subscribe((tok) => (token = tok));
    }
    if (token?.access_token) {
      return {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      };
    }
    return {};
  }

  handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    isCSAgentRequest: boolean
  ): Observable<HttpEvent<UserToken>> {
    return this.handleExpiredToken(isCSAgentRequest).pipe(
      switchMap((token: UserToken) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  // TODO: Handle race conditions here, if we would not be in user mode (auth storage)
  public handleExpiredRefreshToken(isCSAgentRequest: boolean): void {
    let isEmulated;
    combineLatest([
      this.authService.getUserToken(),
      this.asmAuthService.getCustomerSupportAgentToken(),
    ])
      .pipe(take(1))
      .subscribe(([token, csAgentToken]) => {
        if (token.access_token === csAgentToken.access_token) {
          isEmulated = true;
        } else {
          isEmulated = false;
        }
      });
    // Logout user
    if (isEmulated || isCSAgentRequest) {
      this.asmAuthService.logoutCustomerSupportAgent();
      this.globalMessageService.add(
        {
          key: 'asm.csagentTokenExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    } else {
      this.authService.logout();
    }
  }

  protected handleExpiredToken(
    isCSAgentRequest: boolean
  ): Observable<UserToken> {
    let isEmulated;
    combineLatest([
      this.authService.getUserToken(),
      this.asmAuthService.getCustomerSupportAgentToken(),
    ])
      .pipe(take(1))
      .subscribe(([token, csAgentToken]) => {
        if (token.access_token === csAgentToken.access_token) {
          isEmulated = true;
        } else {
          isEmulated = false;
        }
      });
    const stream = isCSAgentRequest
      ? this.asmAuthService.getCustomerSupportAgentToken()
      : this.authService.getUserToken();
    let oldToken: UserToken;
    return stream.pipe(
      tap((token: UserToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.oAuthService.refreshToken();
        } else if (!token.refresh_token) {
          if (isEmulated || isCSAgentRequest) {
            this.asmAuthService.logoutCustomerSupportAgent();
            this.globalMessageService.add(
              {
                key: 'asm.csagentTokenExpired',
              },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          } else {
            this.authService.logout();
          }
          this.routingService.go({ cxRoute: 'login' });
        }
        oldToken = oldToken || token;
      }),
      filter(
        (token: UserToken) => oldToken.access_token !== token.access_token
      ),
      take(1)
    );
  }

  protected createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: UserToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      },
    });
    return request;
  }
}
