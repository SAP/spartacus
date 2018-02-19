import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from './../store';
import { UserToken } from '../models/token-types.model';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromStore.UserState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userToken: UserToken;
    this.store
      .select(fromStore.getUserToken)
      .filter((token: UserToken) => Object.keys(token).length !== 0)
      .subscribe((token: UserToken) => {
        userToken = token;
      });

    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${userToken.token_type} ${userToken.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
