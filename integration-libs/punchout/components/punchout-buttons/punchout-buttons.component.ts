/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'cx-punchout-buttons',
  templateUrl: './punchout-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutButtonsComponent {
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);
  protected authService = inject(AuthService);

  hasSessionId$: Observable<boolean> = this.authService.isUserLoggedIn().pipe(
    switchMap((isLoggedIn) => {
      return isLoggedIn
        ? this.punchoutStoreService.getPunchoutState()
        : of({ punchoutSessionId: undefined });
    }),
    map((punchoutState) => {
      return !!punchoutState.punchoutSessionId;
    })
  );

  submitRequisition(): void {
    this.routingService.goByUrl(PUNCHOUT_REQUISITION_PAGE_URL);
  }
}
