import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

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
    let userToken: UserToken;
    this.store
      .select(fromStore.getUserToken)
      .pipe(filter((token: UserToken) => Object.keys(token).length !== 0))
      .subscribe((token: UserToken) => {
        userToken = token;
      });

    if (
      userToken &&
      request.url.indexOf(this.baseReqString) > -1 &&
      !request.headers.get('Authorization')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `${userToken.token_type} ${userToken.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
