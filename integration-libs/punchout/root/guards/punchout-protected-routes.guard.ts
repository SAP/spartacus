/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ProtectedRoutesGuard } from '@spartacus/core';
import { PunchoutUiRestrictionService } from '@spartacus/punchout/root';

@Injectable({ providedIn: 'root' })
export class PunchoutProtectedRoutesGuard extends ProtectedRoutesGuard {
  protected punchoutUiRestrictionService = inject(PunchoutUiRestrictionService);

  canActivate(route: ActivatedRouteSnapshot): Observable<GuardResult> {
    let urlSegments: string[] = route.url.map((seg) => seg.path);

    // For the root path `/` ActivatedRoute contains an empty array of segments:
    urlSegments = urlSegments.length ? urlSegments : [''];
    return this.punchoutUiRestrictionService.isPunchoutSessionActive().pipe(
      switchMap((punchoutSession) => {
        if (this.service.isUrlProtected(urlSegments) && !punchoutSession) {
          return this.authGuard.canActivate();
        }
        return of(true);
      })
    );
  }
}
