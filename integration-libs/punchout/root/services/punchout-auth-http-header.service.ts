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
export class PunchoutAuthHttpHeaderService
  implements ExpiredRefreshTokenHandler
{
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected punchoutFacade = inject(PunchoutFacade);

  /**
   * Returns whether punchout-specific refresh-token expiration handling was applied.
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
