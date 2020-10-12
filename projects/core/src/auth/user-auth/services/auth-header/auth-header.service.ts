import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CsAgentAuthService } from '../../../../asm/facade/csagent-auth.service';
import { GlobalMessageService } from '../../../../global-message';
import { RoutingService } from '../../../../routing/facade/routing.service';
import { AuthService } from '../../facade/auth.service';
import { CxOAuthService } from '../../facade/cx-oauth-service';
import { UserToken } from '../../models/user-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  constructor(
    public authService: AuthService,
    public asmAuthService: CsAgentAuthService,
    public oAuthService: CxOAuthService,
    public routingService: RoutingService,
    public globalMessageService: GlobalMessageService
  ) {}
  // TODO: Rethink if maybe it's better to use authStorage directly for the tokens

  getAuthorizationHeader(request: HttpRequest<any>): string {
    const rawValue = request.headers.get('Authorization');
    return rawValue;
  }

  createAuthorizationHeader(): any {
    let token;
    this.authService
      .getUserToken()
      .pipe(take(1))
      .subscribe((tok) => (token = tok));
    if (token?.access_token) {
      return {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      };
    }
    return {};
  }

  handleExpiredAccessToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<UserToken>> {
    return this.handleExpiredToken().pipe(
      switchMap((token: UserToken) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  public handleExpiredRefreshToken(): void {
    // Logout user
    this.authService.logout();
  }

  protected handleExpiredToken(): Observable<UserToken> {
    const stream = this.authService.getUserToken();
    let oldToken: UserToken;
    return stream.pipe(
      tap((token: UserToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.oAuthService.refreshToken();
        } else if (!token.refresh_token) {
          this.authService.logout();

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
