import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, tap, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';
import * as fromUserStore from '../../user/store';

import { ConfigService } from '../../occ/config.service';
import {
  ClientAuthenticationToken,
  AuthenticationToken,
  UserToken
} from '../../user/models/token-types.model';

interface RequestMapping {
  method: string;
  urlPattern: string;
}

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromStore.ClientAuthenticationState>,
    private configService: ConfigService
  ) {}

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
      { method: 'POST', urlPattern: '^(.*?)/users$' },
      { method: 'POST', urlPattern: '^(.*?)/forgottenpasswordtokens' },
      { method: 'PUT', urlPattern: '^(.*?)/users/(.*?)/carts/(.*?)/email' }
    ];
    for (const value of clientEndpoints) {
      if (
        request.url.match(value.urlPattern) &&
        request.method === value.method
      ) {
        return this.getClientToken();
      }
    }
    return this.getUserToken(request);
  }

  private getClientToken(): Observable<ClientAuthenticationToken> {
    return this.store.select(fromStore.getAuthClient).pipe(
      tap((token: ClientAuthenticationToken) => {
        if (Object.keys(token).length === 0) {
          this.store.dispatch(new fromStore.LoadClientAuthenticationToken());
        }
      }),
      filter(
        (token: ClientAuthenticationToken) => Object.keys(token).length !== 0
      ),
      take(1)
    );
  }

  private getUserToken(request: HttpRequest<any>): Observable<UserToken> {
    let userToken: UserToken;
    this.store
      .select(fromUserStore.getUserToken)
      .pipe(filter((token: UserToken) => Object.keys(token).length !== 0))
      .subscribe((token: UserToken) => {
        userToken = token;
      });

    const baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;

    if (request.url.indexOf(baseReqString) === -1) {
      return of(null);
    } else {
      return of(userToken);
    }
  }
}
