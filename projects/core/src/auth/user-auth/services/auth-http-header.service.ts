import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHttpHeaderService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService
  ) {}

  /**
   * Checks if request should be handled by this service (if it's OCC call).
   */
  public shouldCatchError(request: HttpRequest<any>): boolean {
    return this.isOccUrl(request.url);
  }

  /**
   * Adds `Authorization` header for OCC calls.
   */
  public alterRequest(request: HttpRequest<any>): HttpRequest<any> {
    const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
    const isOccUrl = this.isOccUrl(request.url);
    if (!hasAuthorizationHeader && isOccUrl) {
      return request.clone({
        setHeaders: {
          ...this.createAuthorizationHeader(),
        },
      });
    }
    return request;
  }

  protected isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }

  protected getAuthorizationHeader(request: HttpRequest<any>): string {
    const rawValue = request.headers.get('Authorization');
    return rawValue;
  }

  protected createAuthorizationHeader(): { Authorization: string } | {} {
    let token;
    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();

    if (token?.access_token) {
      return {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      };
    }
    return {};
  }

  /**
   * Refreshes access_token and then retries the call with the new token.
   */
  public handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<AuthToken>> {
    return this.handleExpiredToken().pipe(
      switchMap((token: AuthToken) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  /**
   * Logout user, redirected to login page and informs about expired session.
   */
  public handleExpiredRefreshToken(): void {
    // Logout user
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout();

    // There might be 2 cases:
    // 1. when user is already on some page (router is stable) and performs an UI action
    // that triggers http call (i.e. button click to save data in backend)
    // 2. when user is navigating to some page and a route guard triggers the http call
    // (i.e. guard loading cms page data)
    //
    // In the second case, we want to remember the anticipated url before we navigate to
    // the login page, so we can redirect back to that URL after user authenticates.
    this.authRedirectService.saveCurrentNavigationUrl();
    this.routingService.go({ cxRoute: 'login' });

    this.globalMessageService.add(
      {
        key: 'httpHandlers.sessionExpired',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  /**
   * Attempts to refresh token if possible.
   * If it is not possible calls `handleExpiredRefreshToken`.
   *
   * @return observable which omits new access_token. (Warn: might never emit!).
   */
  protected handleExpiredToken(): Observable<AuthToken> {
    const stream = this.authStorageService.getToken();
    let oldToken: AuthToken;
    return stream.pipe(
      tap((token: AuthToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.oAuthLibWrapperService.refreshToken();
        } else if (!token.refresh_token) {
          this.handleExpiredRefreshToken();
        }
        oldToken = oldToken || token;
      }),
      filter(
        (token: AuthToken) => oldToken.access_token !== token.access_token
      ),
      take(1)
    );
  }

  protected createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: AuthToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      },
    });
    return request;
  }
}
