/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { PunchoutStoreService } from '@spartacus/punchout/root';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class PunchoutComponentsService {
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);

  isPunchoutSessionActive(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? this.punchoutStoreService.getPunchoutState()
          : of({ punchoutSessionId: undefined });
      }),
      map((punchoutState) => {
        return !!punchoutState.punchoutSessionId;
      })
    );
  }
}
