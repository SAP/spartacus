import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { AuthStorageService } from '../facade/auth-storage.service';

// We need this one, because OAuth hybris server requires access_token in header for revoke token. XD
@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  constructor(
    public occEndpoints: OccEndpointsService,
    public authStorageService: AuthStorageService
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
    return request.url.includes(this.occEndpoints.getRawEndpoint('revoke'));
  }
}
