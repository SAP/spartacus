import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';

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

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuthStore.AuthState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getTokenForRequest(request).pipe(
      switchMap((token: AuthenticationToken) => {
        if (token) {
          if (this.useClientToken(request)) {
            const updatedHeaders = request.headers.delete(USE_CLIENT_TOKEN);
            request = request.clone({ headers: updatedHeaders });
          }

          const headers = request.headers.append(
            'Authorization',
            `${token.token_type} ${token.access_token}`
          );
          request = request.clone({ headers });
        }
        return next.handle(request);
      })
    );
  }

  private getTokenForRequest(
    request: HttpRequest<any>
  ): Observable<AuthenticationToken> {
    if (this.useClientToken(request)) {
      return this.getClientToken();
    }

    return of(null);
  }

  private getClientToken(): Observable<ClientAuthenticationToken> {
    return this.store.select(fromAuthStore.getClientToken).pipe(
      tap((token: ClientAuthenticationToken) => {
        if (Object.keys(token).length === 0) {
          this.store.dispatch(new fromAuthStore.LoadClientToken());
        }
      }),
      filter(
        (token: ClientAuthenticationToken) => Object.keys(token).length !== 0
      )
    );
  }

  private useClientToken(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CLIENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }
}
