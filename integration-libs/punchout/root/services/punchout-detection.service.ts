/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { PUNCHOUT_SESSION_PAGE_URL } from '../model';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({ providedIn: 'root' })
export class PunchoutDetectionService {
  protected location = inject(Location);
  protected punchoutStoreService = inject(PunchoutStoreService);

  /**
   * Check if browser url is the punchout initial session page.
   * With default config, the expected url shape is '/punchout/cxml/session?abcd'.
   * @returns boolean
   */
  isPunchoutSessionPage(): boolean {
    const urlSections = this.location.path().split('?');
    return (
      urlSections.length > 1 &&
      urlSections[0].includes(PUNCHOUT_SESSION_PAGE_URL)
    );
  }
  isPunchoutSession(): boolean | undefined {
    return !!this.punchoutStoreService.getPunchoutSessionId();
  }
}
