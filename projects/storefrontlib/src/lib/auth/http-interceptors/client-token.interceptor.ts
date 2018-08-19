import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, map } from 'rxjs/operators';

import {
  AuthenticationToken,
  ClientAuthenticationToken
} from '../models/token-types.model';

import { Store } from '@ngrx/store';
import * as fromAuthStore from './../store';
import {
  USE_CLIENT_TOKEN,
  InterceptorUtil
} from '../../site-context/shared/http-interceptors/interceptor-util';
import { ClientTokenState } from '../store/reducers/client-token.reducer';

@Injectable()
export class ClientTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuthStore.AuthState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getTokenForRequest(request).pipe(
      switchMap((token: AuthenticationToken) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type} ${token.access_token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }

  private getTokenForRequest(
    request: HttpRequest<any>
  ): Observable<AuthenticationToken> {
    if (
      InterceptorUtil.getInterceptorParam(USE_CLIENT_TOKEN, request.headers)
    ) {
      return this.getClientToken();
    }

    return of(null);
  }

  private getClientToken(): Observable<ClientAuthenticationToken> {
    return this.store.select(fromAuthStore.getClientTokenState).pipe(
      tap((state: ClientTokenState) => {
        if (!state.loading && Object.keys(state.token).length === 0) {
          this.store.dispatch(new fromAuthStore.LoadClientToken());
        }
      }),
      filter(
        (state: ClientTokenState) => Object.keys(state.token).length !== 0
      ),
      map((state: ClientTokenState) => state.token)
    );
  }
}
