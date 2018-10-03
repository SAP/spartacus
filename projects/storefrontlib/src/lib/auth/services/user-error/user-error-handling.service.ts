import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { tap, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../../store';

import { UserToken } from '../../models/token-types.model';

@Injectable()
export class UserErrorHandlingService {
  readonly LOGIN_URL = '/login';

  constructor(
    private store: Store<fromStore.AuthState>,
    private router: Router
  ) {}

  public handleExpiredUserToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.handleExpiredToken().pipe(
      switchMap(([token]: [UserToken, boolean]) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  public handleExpiredRefreshToken() {
    // Logout user
    this.store.dispatch(new fromStore.Logout());
  }

  private handleExpiredToken(): Observable<any> {
    let oldToken;
    return combineLatest(
      this.store.pipe(select(fromStore.getUserToken)),
      this.store.pipe(select(fromStore.getUserTokenLoading))
    ).pipe(
      tap(([token, loading]: [UserToken, boolean]) => {
        oldToken = oldToken || token;
        if (token.access_token && token.refresh_token && !loading) {
          this.store.dispatch(
            new fromStore.RefreshUserToken({
              userId: token.userId,
              refreshToken: token.refresh_token
            })
          );
        } else if (!token.access_token && !token.refresh_token) {
          this.router.navigate([this.LOGIN_URL]);
        }
      }),
      filter(
        ([token]: [UserToken, boolean]) =>
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
