import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../../occ/utils/interceptor-util';
import { ClientToken } from '../models/client-token.model';
import { ClientErrorHandlingService } from '../services/client-error-handling.service';
import { ClientTokenService } from '../services/client-token.service';

/**
 * Interceptor for handling requests with `USE_CLIENT_TOKEN` header.
 * Provides `Authorization` header with client token and handles errors related to client auth.
 */
@Injectable({ providedIn: 'root' })
export class ClientTokenInterceptor implements HttpInterceptor {
  constructor(
    protected clientTokenService: ClientTokenService,
    protected clientErrorHandlingService: ClientErrorHandlingService,
    protected occEndpoints: OccEndpointsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isClientTokenRequest = this.isClientTokenRequest(request);
    if (isClientTokenRequest) {
      request = InterceptorUtil.removeHeader(USE_CLIENT_TOKEN, request);
    }

    return this.getClientToken(isClientTokenRequest).pipe(
      take(1),
      switchMap((token: ClientToken) => {
        if (
          token?.access_token &&
          request.url.includes(this.occEndpoints.getBaseUrl())
        ) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type || 'Bearer'} ${
                token.access_token
              }`,
            },
          });
        }

        return next.handle(request).pipe(
          catchError((errResponse: any) => {
            if (errResponse instanceof HttpErrorResponse) {
              if (errResponse.status === 401) {
                if (isClientTokenRequest) {
                  if (this.isExpiredToken(errResponse)) {
                    return this.clientErrorHandlingService.handleExpiredClientToken(
                      request,
                      next
                    );
                  }
                }
              }
            }
            return throwError(errResponse);
          })
        );
      })
    );
  }

  protected getClientToken(
    isClientTokenRequest: boolean
  ): Observable<ClientToken> {
    if (isClientTokenRequest) {
      return this.clientTokenService.getClientToken();
    }
    return of(null);
  }

  protected isClientTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CLIENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
