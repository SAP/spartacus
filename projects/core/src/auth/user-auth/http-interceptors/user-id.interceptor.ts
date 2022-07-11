import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_GUEST,
} from '@spartacus/core';
import { Observable, iif } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

import { UserIdService } from '../facade/user-id.service';

@Injectable({ providedIn: 'root' })
export class UserIdInterceptor implements HttpInterceptor {
  private readonly userIdHeader = 'sap-commerce-cloud-user-id';
  private readonly urlMatcher: RegExp;
  private readonly userIdConstantMatcher: RegExp;

  constructor(protected userIdService: UserIdService) {
    const paths = ['/products/search', '/costcenters'];

    this.urlMatcher = new RegExp(paths.join('|'));

    const userIdConstants = [
      OCC_USER_ID_CURRENT,
      OCC_USER_ID_ANONYMOUS,
      OCC_USER_ID_GUEST,
      OCC_CART_ID_CURRENT,
    ];

    this.userIdConstantMatcher = new RegExp(userIdConstants.join('|'));
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return iif(
      () => this.urlMatcher.test(httpRequest.url),
      this.userIdService.getUserId().pipe(
        take(1),
        concatMap((userId) => {
          let request = httpRequest;

          if (userId && !this.userIdConstantMatcher.test(userId)) {
            request = httpRequest.clone({
              headers: httpRequest.headers.set(this.userIdHeader, userId),
            });
          }

          return next.handle(request);
        })
      ),
      next.handle(httpRequest)
    );
  }
}
