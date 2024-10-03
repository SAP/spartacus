/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Config,
  OCC_HTTP_TOKEN,
  OCC_USER_ID_CONSTANTS,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { AsmConfig } from '../config/asm-config';

/**
 * Looks for a specific key in the HttpRequest's context (OCC_ASM_TOKEN) to decide when to
 * configure a request with 'sap-commerce-cloud-user-id' header.
 */
@Injectable({ providedIn: 'root' })
export class UserIdHttpHeaderInterceptor implements HttpInterceptor {
  protected readonly userIdHeader = 'sap-commerce-cloud-user-id';

  protected readonly uniqueUserIdConstants: Set<string>;

  constructor(
    protected config: Config,
    protected userIdService: UserIdService,
    @Inject(OCC_USER_ID_CONSTANTS)
    protected userIdConstants: { [identifier: string]: string }
  ) {
    this.uniqueUserIdConstants = new Set(Object.values(userIdConstants));
  }

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Casting as <AsmConfig> to avoid circular dependencies with @spartacus/asm/core.
    if (!(<AsmConfig>this.config).asm?.userIdHttpHeader?.enable) {
      return next.handle(httpRequest);
    }

    const asmContext = httpRequest.context.get(OCC_HTTP_TOKEN);

    let userIdObservable: Observable<string | undefined>;

    if (typeof asmContext.sendUserIdAsHeader === 'string') {
      userIdObservable = of(asmContext.sendUserIdAsHeader);
    } else if (asmContext.sendUserIdAsHeader) {
      userIdObservable = this.userIdService
        .takeUserId()
        .pipe(
          map((userId) =>
            this.uniqueUserIdConstants.has(userId) ? undefined : userId
          )
        );
    } else {
      return next.handle(httpRequest);
    }

    return userIdObservable.pipe(
      concatMap((userId) => {
        if (userId) {
          const request = httpRequest.clone({
            headers: httpRequest.headers.set(this.userIdHeader, userId),
          });

          return next.handle(request);
        } else {
          return next.handle(httpRequest);
        }
      })
    );
  }
}
