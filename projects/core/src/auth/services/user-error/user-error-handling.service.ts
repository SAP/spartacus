import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, filter, take, switchMap } from 'rxjs/operators';

import { AuthService } from '../../facade/auth.service';
import { UserToken } from '../../models/token-types.model';

@Injectable()
export class UserErrorHandlingService {
  readonly LOGIN_URL = '/login';

  constructor(private authService: AuthService, private router: Router) {}

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

  public handleExpiredRefreshToken() {
    // Logout user
    this.authService.logout();
  }

  private handleExpiredToken(): Observable<UserToken> {
    let oldToken: UserToken;
    return this.authService.userToken$.pipe(
      tap((token: UserToken) => {
        if (token.access_token && token.refresh_token && !oldToken) {
          this.authService.refreshUserToken(token);
        } else if (!token.access_token && !token.refresh_token) {
          this.router.navigate([this.LOGIN_URL]);
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
