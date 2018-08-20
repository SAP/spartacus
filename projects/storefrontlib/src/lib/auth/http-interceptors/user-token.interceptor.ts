import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { ConfigService } from '../../occ/config.service';
import { UserToken } from '../../auth/models/token-types.model';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(
    private configService: ConfigService,
    private store: Store<fromStore.AuthState>
  ) {}

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

    const baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;

    if (
      userToken &&
      request.url.indexOf(baseReqString) > -1 &&
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
