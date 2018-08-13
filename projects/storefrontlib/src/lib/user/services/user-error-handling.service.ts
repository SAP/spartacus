import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { tap, filter, take, switchMap } from 'rxjs/operators';

import * as fromUserStore from '../../user/store';
import { UserToken } from '../../user/models/token-types.model';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class UserErrorHandlingService {
  readonly LOGIN_URL = '/login';

  constructor(
    private store: Store<fromUserStore.UserState>,
    private router: Router
  ) {}

  public handleExpiredUserToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.handleExpiredToken().pipe(
      switchMap(([token, _loading]: [UserToken, boolean]) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  public handleExpiredRefreshToken() {
    // Logout user
    this.store.dispatch(new fromUserStore.Logout());
  }

  private handleExpiredToken(): Observable<any> {
    let oldToken;
    return combineLatest(
      this.store.select(fromUserStore.getUserToken),
      this.store.select(fromUserStore.getUserTokenLoading)
    ).pipe(
      tap(([token, loading]: [UserToken, boolean]) => {
        oldToken = oldToken || token;
        if (token.access_token && token.refresh_token && !loading) {
          this.store.dispatch(
            new fromUserStore.RefreshUserToken({
              userId: token.userId,
              refreshToken: token.refresh_token
            })
          );
        } else if (!token.access_token && !token.refresh_token) {
          // Redirect to login if user has no token but we don't have a login page
          this.router.navigate([this.LOGIN_URL]);
        }
      }),
      filter(
        ([token, loading]: [UserToken, boolean]) =>
          oldToken.access_token !== token.access_token
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
