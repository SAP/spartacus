import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, iif } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

import { GlobService } from '../../../../../core/src/util/glob.service';
import { OCC_USER_ID_CONSTANTS_TOKEN } from '../../../../../core/src/occ/utils/occ-constants';

import { UserIdService } from '../facade/user-id.service';
import { UserIdPathAllowListInjectionToken } from './user-id-allow-list.const';

@Injectable({ providedIn: 'root' })
export class UserIdInterceptor implements HttpInterceptor {
  private readonly userIdHeader = 'sap-commerce-cloud-user-id';

  private readonly uniqueUserIdConstants: Set<string>;

  private validateUrl: (url: string) => boolean;

  constructor(
    protected userIdService: UserIdService,
    globService: GlobService,
    @Inject(OCC_USER_ID_CONSTANTS_TOKEN) userIdConstants: Array<string>,
    @Inject(UserIdPathAllowListInjectionToken) paths: Array<string>
  ) {
    this.uniqueUserIdConstants = new Set(userIdConstants);

    this.validateUrl = globService.getValidator(
      paths.map((path) => `**${path}*`)
    );
  }

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return iif(
      () => this.validateUrl(httpRequest.url) ?? false,
      this.userIdService.getUserId().pipe(
        take(1),
        concatMap((userId: string) => {
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
}
