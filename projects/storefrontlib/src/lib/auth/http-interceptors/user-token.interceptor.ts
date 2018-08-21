import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfigService } from '../../occ/config.service';

import { UserToken } from '../../auth/models/token-types.model';

import * as fromStore from '../store';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  baseReqString;

  constructor(
    private configService: ConfigService,
    private store: Store<fromStore.AuthState>
  ) {
    this.baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromStore.getUserToken).pipe(
      switchMap((token: UserToken) => {
        if (
          token &&
          request.url.indexOf(this.baseReqString) > -1 &&
          !request.headers.get('Authorization')
        ) {
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
}
