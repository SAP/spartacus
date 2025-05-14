/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutStoreService,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-punchout-buttons',
  templateUrl: './punchout-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutButtonsComponent {
  @Input() removeCancelButton = false;

  protected punchoutUiRestrictionService = inject(PunchoutUiRestrictionService);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutUiRestrictionService.isPunchoutSessionActive();

  submitRequisition(cancelRequisition = false): void {
    this.punchoutStoreService.updatePunchoutState({ cancelRequisition });
    this.routingService.go(PUNCHOUT_REQUISITION_PAGE_URL);
  }
}
