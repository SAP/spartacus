import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, iif } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

import { GlobService } from '../../../../projects/core/src/util/glob.service';
import { OCC_USER_ID_CONSTANTS } from '../../../../projects/core/src/occ/utils';

import { UserIdService } from '../../../../projects/core/src/auth/user-auth/facade/user-id.service';
import { AsmConfig } from '../../core/config/asm-config';

@Injectable({ providedIn: 'root' })
export class UserIdInterceptor implements HttpInterceptor {
  private readonly userIdHeader = 'sap-commerce-cloud-user-id';

  private readonly uniqueUserIdConstants: Set<string>;

  private validateUrlFn: (url: string) => boolean | undefined;

  constructor(
    protected asmConfig: AsmConfig,
    protected globService: GlobService,
    protected userIdService: UserIdService,
    @Inject(OCC_USER_ID_CONSTANTS)
    userIdConstants: { [identifier: string]: string }
  ) {
    this.uniqueUserIdConstants = new Set(Object.values(userIdConstants));
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

  private validateUrl(url: string): boolean {
    // The AsmConfig is lazy-loaded. This conditional is in case the config is not available when the interceptor is constructed.
    if (!this.validateUrlFn && this.asmConfig.asm) {
      const paths = this.asmConfig.asm?.userIdInterceptor?.patterns ?? [];
      this.validateUrlFn = this.globService.getValidator(paths);
    }
    return this.validateUrlFn?.(url) ?? false;
  }
}
