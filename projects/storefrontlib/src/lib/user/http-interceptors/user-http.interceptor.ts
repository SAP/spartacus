import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromUserStore from '../store';
import * as fromAuthStore from './../../auth/store';
import { ConfigService } from '../../occ/config.service';
import { Store } from '@ngrx/store';
import { UserToken } from '../../auth/models/token-types.model';

@Injectable()
export class UserHttpInterceptor implements HttpInterceptor {
  userToken: UserToken;
  baseReqString: string;

  constructor(
    private configService: ConfigService,
    private store: Store<fromUserStore.UserState>
  ) {
    this.baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;

    this.store
      .select(fromAuthStore.getUserToken)
      .pipe(filter((token: UserToken) => Object.keys(token).length !== 0))
      .subscribe((token: UserToken) => {
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
