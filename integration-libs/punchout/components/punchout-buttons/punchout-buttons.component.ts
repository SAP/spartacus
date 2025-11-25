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
import {
  PunchoutFacade,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-punchout-buttons',
  templateUrl: './punchout-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class PunchoutButtonsComponent {
  @Input() removeCancelButton = false;

  protected punchoutUiRestrictionService = inject(PunchoutUiRestrictionService);
  protected punchoutFacade = inject(PunchoutFacade);

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutUiRestrictionService.isPunchoutSessionActive();

  submitRequisition(cancelRequisition = false): void {
    this.punchoutFacade.submitRequisition(cancelRequisition);
  }
}
