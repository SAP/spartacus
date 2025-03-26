/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'cx-punchout-buttons',
  templateUrl: './punchout-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutButtonsComponent {
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);

  hasSessionId$: Observable<boolean> = this.punchoutStoreService
    .getPunchoutState()
    .pipe(
      map((punchoutState) => {
        return !!punchoutState.punchoutSessionId;
      })
    );

  submitRequisition(): void {
    console.log('submitRequisition');
    this.routingService.goByUrl(PUNCHOUT_REQUISITION_PAGE_URL);
  }
}
