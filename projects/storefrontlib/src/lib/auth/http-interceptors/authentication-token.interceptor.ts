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
import { RequestMapping } from '@auth/models/request-mapping.model';
import {
  REQUEST_MAPPING_CUSTOM_HEADER,
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
          if (this.containsRequestMapping(request)) {
            const updatedHeaders = request.headers.delete(
              REQUEST_MAPPING_CUSTOM_HEADER
            );
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

  // Left these lines commented, as they can be useful once we implement the functionality for 'forgot password'
  // and 'assigning an email to the cart' (anonymous checkout)
  //   { method: 'POST', urlPattern: '^(.*?)/forgottenpasswordtokens' },
  //   { method: 'PUT', urlPattern: '^(.*?)/users/(.*?)/carts/(.*?)/email' }
  private getTokenForRequest(
    request: HttpRequest<any>
  ): Observable<AuthenticationToken> {
    if (this.containsRequestMapping(request)) {
      const requestMapping: RequestMapping = InterceptorUtil.getInterceptorParam(
        REQUEST_MAPPING_CUSTOM_HEADER,
        request.headers
      );
      const url = request.url.split('?')[0];
      if (
        url.match(requestMapping.urlPattern) &&
        request.method === requestMapping.method &&
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

  private containsRequestMapping(request: HttpRequest<any>): boolean {
    const requestMapping = InterceptorUtil.getInterceptorParam(
      REQUEST_MAPPING_CUSTOM_HEADER,
      request.headers
    );
    return Boolean(requestMapping);
  }
}
