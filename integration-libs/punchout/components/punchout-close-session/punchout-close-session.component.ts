/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PunchoutFacade } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { PunchoutComponentsService } from '../punchout-components.service';

@Component({
  selector: 'cx-punchout-close-session',
  templateUrl: './punchout-close-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutCloseSessionComponent {
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutComponentsService = inject(PunchoutComponentsService);

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutComponentsService.isPunchoutSessionActive();

  clickCloseSessionButton(): void {
    this.punchoutFacade.closePunchoutSession().subscribe();
  }
}
