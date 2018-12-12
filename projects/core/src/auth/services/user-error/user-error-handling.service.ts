import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, filter, take, switchMap } from 'rxjs/operators';

import { AuthService } from '../../facade/auth.service';
import { UserToken } from '../../models/token-types.model';
import { RoutingService } from '../../../routing/facade/routing.service';

@Injectable()
export class UserErrorHandlingService {
  constructor(
    private authService: AuthService,
    private routingService: RoutingService
  ) {}

  public handleExpiredUserToken(
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

  private handleExpiredToken(): Observable<UserToken> {
    let oldToken: UserToken;
    return this.authService.getUserToken().pipe(
      tap((token: UserToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.authService.refreshUserToken(token);
        } else if (!token.access_token && !token.refresh_token) {
          this.routingService.go({ route: ['login'] });
        }
        oldToken = oldToken || token;
      }),
      filter(
        (token: UserToken) => oldToken.access_token !== token.access_token
      ),
      take(1)
    );
  }

  private createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: UserToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    });
    return request;
  }
}
