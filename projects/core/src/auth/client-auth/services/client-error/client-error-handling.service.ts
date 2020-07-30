import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ClientToken } from '../../models/client-token.model';
import { ClientTokenService } from '../client-token.service';

@Injectable({
  providedIn: 'root',
})
export class ClientErrorHandlingService {
  constructor(protected clientTokenService: ClientTokenService) {}

  public handleExpiredClientToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.clientTokenService.refreshClientToken().pipe(
      take(1),
      switchMap((token: ClientToken) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  protected createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: ClientToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
      },
    });
    return request;
  }
}
