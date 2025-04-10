/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { PunchoutFacade, PunchoutStoreService } from '@spartacus/punchout/root';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'cx-punchout-close-session',
  templateUrl: './punchout-close-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutCloseSessionComponent {
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);
  protected punchoutFacade = inject(PunchoutFacade);

  isPunchoutSessionActive$: Observable<boolean> = this.authService
    .isUserLoggedIn()
    .pipe(
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? this.punchoutStoreService.getPunchoutState()
          : of({ punchoutSessionId: undefined });
      }),
      map((punchoutState) => {
        return !!punchoutState.punchoutSessionId;
      })
    );

  clickCloseSessionButton(): void {
    this.punchoutFacade.closePunchoutSession().subscribe();
  }
}
