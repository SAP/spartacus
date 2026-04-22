/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssistantWidgetService {
  private readonly doc = inject(DOCUMENT);

  init(): void {
    const el = this.doc.getElementById('cx-assistant-widget');
    if (el) {
      el.setAttribute('api-url', environment.assistantApiUrl);
    }
  }
}
