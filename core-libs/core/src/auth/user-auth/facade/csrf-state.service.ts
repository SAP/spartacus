/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CSRFResponse } from '../models/csrf-response';

/**
 * Shares the CSRF token from {@link CustomLoginGuard} with {@link LoginFormComponentService}.
 *
 * The guard does not write {@link authReqId} to this service. Passing auth_req_id
 * through a root-scoped singleton would create a race between concurrent
 * canActivate() activations — for example two browser tabs in the same SPA session,
 * or a retry redirect that triggers a new activation before the first HTTP call
 * completes. Instead, auth_req_id travels exclusively through the URL query parameter
 * appended by the guard, and LoginFormComponentService reads it from
 * ActivatedRoute.snapshot.queryParams which is per-activation and never shared.
 * The {@link getAuthReqId} and {@link setAuthReqId} methods are retained for
 * backwards compatibility and external extension points.
 */
@Injectable({
  providedIn: 'root',
})
export class CsrfStateService {
  protected csrf: CSRFResponse;
  protected authReqId: string | undefined;

  get() {
    return this.csrf;
  }

  set(value: CSRFResponse) {
    this.csrf = value;
  }

  getAuthReqId(): string | undefined {
    return this.authReqId;
  }

  /**
   * Sets the auth_req_id value.
   * Not used by the built-in guard and form pipeline; retained for backwards
   * compatibility and external extension points.
   */
  setAuthReqId(value: string | undefined) {
    this.authReqId = value;
  }
}
