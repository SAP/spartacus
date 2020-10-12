import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../facade/auth-storage.service';
import { AuthConfigService } from '../services/auth-config.service';

// We need this one, because OAuth hybris server requires access_token in header for revoke token. XD
@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  constructor(
    protected authStorageService: AuthStorageService,
    protected authConfigService: AuthConfigService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isTokenRevocationRequest = this.isTokenRevocationRequest(request);
    if (isTokenRevocationRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `${
            JSON.parse(this.authStorageService.getItem('token_type')) ||
            'Bearer'
          } ${this.authStorageService.getItem('access_token')}`,
        },
      });
    }

    return next.handle(request);
  }

  protected isTokenRevocationRequest(request: HttpRequest<any>): boolean {
    return request.url === this.authConfigService.getRevokeEndpoint();
  }
}
