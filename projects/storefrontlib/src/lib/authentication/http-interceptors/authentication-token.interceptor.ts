import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromStore from '../store';

import { TrustedClientToken } from '../../user/models/token-types.model';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromStore.AuthenticationState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clientToken: TrustedClientToken;
    this.store
      .select(fromStore.getTrustedToken)
      .pipe(
        filter(Boolean),
        filter((token: TrustedClientToken) => Object.keys(token).length !== 0)
      )
      .subscribe((token: TrustedClientToken) => {
        clientToken = token;
      });

    // Validate another token is not yet present
    if (clientToken && !request.headers.get('Authorization')) {
      const headers = request.headers.append(
        'Authorization',
        `${clientToken.token_type} ${clientToken.access_token}`
      );
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
