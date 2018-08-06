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
import * as fromAuthStore from '@auth/store';
import { RequestMapping } from '@auth/models/client-token-http-param';

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
    const clientEndpoints: Array<RequestMapping> = [
      { method: 'POST', urlPattern: '^(.*?)/users/$' },
      { method: 'POST', urlPattern: '^(.*?)/forgottenpasswordtokens' },
      { method: 'PUT', urlPattern: '^(.*?)/users/(.*?)/carts/(.*?)/email' }
    ];
    const url = request.url.split('?')[0];
    for (const value of clientEndpoints) {
      if (
        url.match(value.urlPattern) &&
        request.method === value.method &&
        !request.headers.get('Authorization')
      ) {
        return this.getClientToken();
      }
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
}
