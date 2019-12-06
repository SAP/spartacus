import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { AsmAuthService } from '../facade/asm-auth.service';
import { UserToken } from '../../auth/models/token-types.model';

@Injectable({ providedIn: 'root' })
export class CustomerSupportAgentTokenInterceptor implements HttpInterceptor {
  constructor(private asmAuthService: AsmAuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getCustomerSupportAgentToken(request).pipe(
      take(1),
      switchMap((token: UserToken) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }

  private getCustomerSupportAgentToken(
    request: HttpRequest<any>
  ): Observable<UserToken> {
    if (
      InterceptorUtil.getInterceptorParam(
        USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
        request.headers
      )
    ) {
      return this.asmAuthService.getCustomerSupportAgentToken();
    }
    return of(null);
  }
}
