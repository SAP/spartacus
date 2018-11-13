import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, tap, filter, map } from 'rxjs/operators';

import { ClientAuthenticationToken } from '../../models/token-types.model';

import * as fromStore from '../../store';
import { ClientTokenState } from '../../store/reducers/client-token.reducer';

@Injectable()
export class ClientErrorHandlingService {
  constructor(private store: Store<fromStore.AuthState>) {}

  public handleExpiredClientToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.loadNewClientToken().pipe(
      switchMap((token: ClientAuthenticationToken) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  private loadNewClientToken(): Observable<any> {
    return this.store.pipe(
      select(fromStore.getClientTokenState),
      tap((state: ClientTokenState) => {
        if (!state.loading) {
          this.store.dispatch(new fromStore.LoadClientToken());
        }
      }),
      filter((state: ClientTokenState) => state.loaded),
      map((state: ClientTokenState) => state.token)
    );
  }

  private createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: ClientAuthenticationToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    });
    return request;
  }
}
