import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { AuthService } from '../facade/auth.service';
import { ClientErrorHandlingService } from '../services/client-error/client-error-handling.service';
import { CustomerSupportAgentErrorHandlingService } from '../services/csagent-error/csagent-error-handling.service';
import { UserErrorHandlingService } from '../services/user-error/user-error-handling.service';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(
    userErrorHandlingService: UserErrorHandlingService,
    clientErrorHandlingService: ClientErrorHandlingService,
    authService: AuthService,
    // tslint:disable-next-line: unified-signatures
    csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService
  );
  /**
   * @deprecated since version 1.3
   * Instead, use constructor(
   * userErrorHandlingService: UserErrorHandlingService,
   * clientErrorHandlingService: ClientErrorHandlingService,
   * authService: AuthService,
   * csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService
   */
  constructor(
    userErrorHandlingService: UserErrorHandlingService,
    clientErrorHandlingService: ClientErrorHandlingService,
    authService: AuthService
  );
  constructor(
    private userErrorHandlingService: UserErrorHandlingService,
    private clientErrorHandlingService: ClientErrorHandlingService,
    private authService: AuthService,
    private csagentErrorHandlingService?: CustomerSupportAgentErrorHandlingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isClientTokenRequest = this.isClientTokenRequest(request);
    if (isClientTokenRequest) {
      request = InterceptorUtil.removeHeader(USE_CLIENT_TOKEN, request);
    }
    const isCustomerSupportAgentRequest = this.isCustomerSupportAgentRequest(
      request
    );
    if (isCustomerSupportAgentRequest) {
      request = InterceptorUtil.removeHeader(
        USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
        request
      );
    }

    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          switch (errResponse.status) {
            case 401: // Unauthorized
              if (isClientTokenRequest) {
                if (this.isExpiredToken(errResponse)) {
                  return this.clientErrorHandlingService.handleExpiredClientToken(
                    request,
                    next
                  );
                }
                // user token request
              } else if (isCustomerSupportAgentRequest) {
                this.csagentErrorHandlingService.terminateCustomerSupportAgentExpiredSession();
                return of();
              } else {
                if (this.isExpiredToken(errResponse)) {
                  return this.userErrorHandlingService.handleExpiredUserToken(
                    request,
                    next
                  );
                } else if (
                  // Refresh expired token
                  // Check that the OAUTH endpoint was called and the error is for refresh token is expired
                  errResponse.url.includes(OAUTH_ENDPOINT) &&
                  errResponse.error.error === 'invalid_token'
                ) {
                  this.userErrorHandlingService.handleExpiredRefreshToken();
                  return of();
                }
              }
              break;
            case 400: // Bad Request
              if (
                errResponse.url.includes(OAUTH_ENDPOINT) &&
                errResponse.error.error === 'invalid_grant'
              ) {
                if (request.body.get('grant_type') === 'refresh_token') {
                  // refresh token fail, force user logout
                  this.authService.logout();
                }
              }
              break;
          }
        }
        return throwError(errResponse);
      })
    );
  }

  private isClientTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CLIENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }

  private isCustomerSupportAgentRequest(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }

  private isExpiredToken(resp: HttpErrorResponse): boolean {
    if (
      resp.error &&
      resp.error.errors &&
      resp.error.errors instanceof Array &&
      resp.error.errors[0]
    ) {
      return resp.error.errors[0].type === 'InvalidTokenError';
    }
    return false;
  }
}
