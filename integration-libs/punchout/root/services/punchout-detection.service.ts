/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { PUNCHOUT_SESSION_PAGE_URL } from '../model';

@Injectable({ providedIn: 'root' })
export class PunchoutDetectionService {
  protected location = inject(Location);

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
}
