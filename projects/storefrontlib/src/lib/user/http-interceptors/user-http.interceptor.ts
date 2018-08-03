import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromUserStore from '../store';
import { ConfigService } from '../../../config.service';
import { UserToken } from '../models/token-types.model';
import { Store } from '@ngrx/store';

@Injectable()
export class UserHttpInterceptor implements HttpInterceptor {
  constructor(
    private configService: ConfigService,
    private store: Store<fromUserStore.UserState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
