import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { CxOAuthService } from '../facade/cx-oauth-service';
import { AuthToken } from '../models/auth-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  constructor(
    protected authService: AuthService,
    protected cxOAuthService: CxOAuthService,
    protected routingService: RoutingService,
    protected occEndpoints: OccEndpointsService
  ) {}

  public shouldCatchError(request: HttpRequest<any>): boolean {
    return this.isOccUrl(request.url);
  }

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

  protected createAuthorizationHeader(): { Authorization?: string } {
    let token;
    this.authService
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

  public handleExpiredRefreshToken(): void {
    // Logout user
    this.authService.logout();
    this.routingService.go({ cxRoute: 'login' });
  }

  protected handleExpiredToken(): Observable<AuthToken> {
    const stream = this.authService.getToken();
    let oldToken: AuthToken;
    return stream.pipe(
      tap((token: AuthToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.cxOAuthService.refreshToken();
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
