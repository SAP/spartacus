import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfigService } from '../../occ/config.service';
import { UserToken } from '../../auth/models/token-types.model';
import * as fromStore from '../store';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  baseReqString =
    this.configService.server.baseUrl +
    this.configService.server.occPrefix +
    this.configService.site.baseSite;

  constructor(
    private configService: ConfigService,
    private store: Store<fromStore.AuthState>
  ) {}

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
