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
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { CustomerSupportAgentErrorHandlingService } from '../../asm/services/csagent-error-handling.service';

@Injectable({ providedIn: 'root' })
export class CustomerSupportAgentAuthErrorInterceptor
  implements HttpInterceptor {
  constructor(
    private csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
          // Unauthorized
          if (isCustomerSupportAgentRequest && errResponse.status === 401) {
            this.csagentErrorHandlingService.terminateCustomerSupportAgentExpiredSession();
            return of(undefined as any);
          }
        }
        return throwError(errResponse);
      })
    );
  }

  private isCustomerSupportAgentRequest(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }
}
