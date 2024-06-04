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
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@spartacus/core';
import { CdcJsService } from '../service';

@Injectable({ providedIn: 'root' })
export class OccCdcInterceptor implements HttpInterceptor {
  protected cdcService = inject(CdcJsService);
  protected authService = inject(AuthService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.cdcService.verifySession().subscribe((data: any) => {
      if (data.errorCode && data.error!== 0) {
        // when user resets password using 'forgot password?', kill any alive session of that user
        this.authService.logout();
      }
    });
    return next.handle(request);
  }
}
