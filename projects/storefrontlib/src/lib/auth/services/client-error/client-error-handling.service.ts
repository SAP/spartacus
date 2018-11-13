import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../facade/auth.service';
import { ClientAuthenticationToken } from '../../models/token-types.model';

@Injectable()
export class ClientErrorHandlingService {
  constructor(private authService: AuthService) {}

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

  private loadNewClientToken(): Observable<ClientAuthenticationToken> {
    return this.authService.refreshClientToken();
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
