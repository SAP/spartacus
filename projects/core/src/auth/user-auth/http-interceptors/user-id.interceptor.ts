import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, iif } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

import { OccConfig } from '../../../../../core/src/occ/config/occ-config';
import { OCC_USER_ID_CONSTANTS_TOKEN } from '../../../../../core/src/occ/utils/occ-constants';

import { UserIdService } from '../facade/user-id.service';
import { UserIdPathAllowListInjectionToken } from './user-id-allow-list.const';

@Injectable({ providedIn: 'root' })
export class UserIdInterceptor implements HttpInterceptor {
  private readonly userIdHeader = 'sap-commerce-cloud-user-id';

  private readonly occBaseUrl: string | undefined;
  private readonly uniqueUserIdConstants: Set<string>;
  private readonly uniquePaths: RegExp;

  constructor(
    protected userIdService: UserIdService,
    occConfig: OccConfig,
    @Inject(OCC_USER_ID_CONSTANTS_TOKEN) userIdConstants: Array<string>,
    @Inject(UserIdPathAllowListInjectionToken) paths: Array<string>
  ) {
    this.occBaseUrl = occConfig.backend?.occ?.baseUrl;
    this.uniqueUserIdConstants = new Set(userIdConstants);
    this.uniquePaths = new RegExp(paths.join('|'));
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return iif(
      () => this.validateUrl(httpRequest.url) ?? false,
      this.userIdService.getUserId().pipe(
        take(1),
        concatMap((userId) => {
          let request = httpRequest;

          if (userId && !this.uniqueUserIdConstants.has(userId)) {
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

  /**
   * @returns true if the call is to the OCC and the URL contains the specific path.
   */
  private validateUrl(url: string): boolean {
    let baseUrl: string | undefined;

    if ((baseUrl = this.occBaseUrl)) {
      return url.startsWith(baseUrl) && this.uniquePaths.test(url);
    } else {
      return false;
    }
  }
}
