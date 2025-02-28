/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { Observable } from 'rxjs';
import { PunchoutStateService } from '../services/punchout-state.service';

@Injectable({ providedIn: 'root' })
export class PunchoutInterceptor implements HttpInterceptor {
  protected punchoutStateService = inject(PunchoutStateService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const punchoutState = this.punchoutStateService.getPunchoutState();

    if (
      punchoutState?.sId &&
      punchoutState?.session?.cartId &&
      request.url.includes(`/carts/${punchoutState.session.cartId}`)
    ) {
      request = request.clone({
        headers: request.headers.append('punchoutsid', punchoutState.sId),
      });
    }
    return next.handle(request);
  }
}
