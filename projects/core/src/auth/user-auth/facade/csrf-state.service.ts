/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CSRFResponse } from '../models/csrf-response';

/**
 * Service to share the CSRF token from the CustomLoginGuard with the form component.
 */
@Injectable({
  providedIn: 'root',
})
export class CsrfStateService {
  protected csrf: CSRFResponse;

  get() {
    return this.csrf;
  }

  set(value: CSRFResponse) {
    this.csrf = value;
  }
}
