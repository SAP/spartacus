import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConfigService } from '../../occ/config.service';
import { UserToken } from '../../auth/models/token-types.model';
import * as fromStore from '../store';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  userToken: UserToken;
  baseReqString =
    this.configService.server.baseUrl +
    this.configService.server.occPrefix +
    this.configService.site.baseSite;

  constructor(
    private configService: ConfigService,
    private store: Store<fromStore.AuthState>
  ) {
    this.store.select(fromStore.getUserToken).subscribe((token: UserToken) => {
      this.userToken = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.userToken &&
      request.url.indexOf(this.baseReqString) > -1 &&
      !request.headers.get('Authorization')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.userToken.token_type} ${
            this.userToken.access_token
          }`
        }
      });
    }

    return next.handle(request);
  }
}
