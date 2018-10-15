import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromAuthStore from './../store';
import { AuthenticationToken } from '../models/token-types.model';
import {
  USE_CLIENT_TOKEN,
  InterceptorUtil
} from '../../occ/utils/interceptor-util';
import { ClientTokenState } from '../store/reducers/client-token.reducer';
import { AuthModuleConfig } from '../auth-module.config';

@Injectable()
export class ClientTokenInterceptor implements HttpInterceptor {
  baseReqString =
    (this.config.server.baseUrl || '') +
    this.config.server.occPrefix +
    this.config.site.baseSite;

  constructor(
    private config: AuthModuleConfig,
    private store: Store<fromAuthStore.AuthState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getClientToken(request).pipe(
      switchMap((token: AuthenticationToken) => {
        if (token && request.url.indexOf(this.baseReqString) > -1) {
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

  private getClientToken(
    request: HttpRequest<any>
  ): Observable<AuthenticationToken> {
    if (
      InterceptorUtil.getInterceptorParam(USE_CLIENT_TOKEN, request.headers)
    ) {
      return this.store.pipe(
        select(fromAuthStore.getClientTokenState),
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
    return of(null);
  }
}
