/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ExpiredRefreshTokenHandler } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { PunchoutFacade } from '../facade';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutExpiredRefreshTokenHandler
  implements ExpiredRefreshTokenHandler
{
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected punchoutFacade = inject(PunchoutFacade);

  /**
   * Returns whether punchout-specific refresh-token expiration handling was applied.
   * On backend errors indicating expired `refresh_token`, 2 punchout use cases:
   * - When initializing punchout session, previous token gets silently revoked, punchoutFacade can then create punchout session.
   * - When punchout session already exists, punchout session gets ended.
   * It is a workaround to address CXSPA-9608 - Public pages not displayed when token is invalid.
   * To be removed once CXSPA-9608 is closed.
   */
  public handleExpiredRefreshTokenIfApplicable(): Observable<boolean> {
    if (this.punchoutDetectionService.isPunchoutSessionPage()) {
      return this.punchoutFacade.logoutPunchoutUser().pipe(
        map(() => true),
        defaultIfEmpty(true)
      );
    }
    if (this.punchoutDetectionService.isPunchoutSession()) {
      return this.punchoutFacade.endPunchoutSession().pipe(
        map(() => true),
        defaultIfEmpty(true)
      );
    }
    return of(false);
  }
}
