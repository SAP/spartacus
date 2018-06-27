import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, take, switchMap } from 'rxjs/operators';

import * as fromUserStore from '../../user/store';
import { UserToken } from '../../user/models/token-types.model';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class UserErrorHandlingService {
  private isRefreshingToken = false;

  constructor(
    private store: Store<fromUserStore.UserState>,
    private router: Router
  ) {}

  public handleExpiredUserToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.handleExpiredToken().pipe(
      switchMap((token: UserToken) => {
        this.isRefreshingToken = false;
        return next.handle(this.createNewRequest(request, token));
      })
    );
  }

  public handleInvalidRefreshToken(): void {
    this.store.dispatch(new fromUserStore.Logout());
    // Redirect to login if user has no token but we don't have a login page
    window.location.href = '/';
  }

  private handleExpiredToken(): Observable<any> {
    let oldToken;
    if (!this.isRefreshingToken) {
      return this.store.select(fromUserStore.getUserToken).pipe(
        tap((token: UserToken) => {
          oldToken = oldToken || token;
          this.fetchNewToken(token);
        }),
        filter(
          (token: UserToken) => oldToken.access_token !== token.access_token
        ),
        take(1)
      );
    } else {
      return this.store.select(fromUserStore.getUserToken).pipe(
        tap((token: UserToken) => (oldToken = oldToken || token)),
        filter(
          (token: UserToken) => oldToken.access_token !== token.access_token
        ),
        take(1)
      );
    }
  }

  private createNewRequest(
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

  private fetchNewToken(token: UserToken): void {
    if (token.access_token && token.refresh_token && !this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.store.dispatch(
        new fromUserStore.RefreshUserToken({
          userId: token.userId,
          refreshToken: token.refresh_token
        })
      );
    } else if (!token.access_token || !token.refresh_token) {
      // Redirect to login if user has no token but we don't have a login page
      this.router.navigate(['/']);
    }
  }
}
