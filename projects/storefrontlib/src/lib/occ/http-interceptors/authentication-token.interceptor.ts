import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ClientAuthenticationToken,
  AuthenticationToken
} from '../../user/models/token-types.model';
import { OccClientAuthenticationTokenService } from '../client-authentication/client-authentication-token.service';

interface RequestMapping {
  method: string;
  urlPattern: string;
}

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  constructor(
    private clientAuthenticationService: OccClientAuthenticationTokenService
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
    return this.clientAuthenticationService.loadClientAuthenticationToken();
  }
}
