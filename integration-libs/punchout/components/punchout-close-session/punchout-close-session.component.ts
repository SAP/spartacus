/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import {
  PunchoutFacade,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-punchout-close-session',
  templateUrl: './punchout-close-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class PunchoutCloseSessionComponent {
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutUiRestrictionService = inject(PunchoutUiRestrictionService);

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutUiRestrictionService.isPunchoutSessionActive();

  clickCloseSessionButton(): void {
    this.punchoutFacade.closePunchoutSession().subscribe();
  }
}
