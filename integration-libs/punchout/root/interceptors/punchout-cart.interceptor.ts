/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { PunchoutStoreService } from '../services';

/**
 * Add required punchoutsid key/value to request header
 * It is applied to all occ requests containing punchout cart Id with shape: 'carts/{punchoutCartId}'
 */

@Injectable({ providedIn: 'root' })
export class PunchoutCartInterceptor implements HttpInterceptor {
  protected readonly PUNCHOUT_SESSION_ID_HEADER_KEY = 'punchoutsid';

  protected punchoutStoreService = inject(PunchoutStoreService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.punchoutStoreService.getPunchoutState().pipe(
      take(1),
      switchMap((punchoutState) => {
        if (
          punchoutState?.punchoutSessionId &&
          punchoutState?.punchoutSession?.cartId &&
          request.url.includes(`/carts/${punchoutState.punchoutSession.cartId}`)
        ) {
          request = request.clone({
            headers: request.headers.append(
              this.PUNCHOUT_SESSION_ID_HEADER_KEY,
              punchoutState.punchoutSessionId
            ),
          });
        }
        return next.handle(request);
      })
    );
  }
}
