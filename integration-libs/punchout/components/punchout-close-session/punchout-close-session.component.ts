/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PunchoutFacade } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { PunchoutComponentsService } from '../punchout-components.service';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

@Component({
  selector: 'cx-punchout-close-session',
  templateUrl: './punchout-close-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutCloseSessionComponent {
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutComponentsService = inject(PunchoutComponentsService);
  protected messageService = inject(GlobalMessageService);

  protected closeSessionTriggered = false;

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutComponentsService.isPunchoutSessionActive();

  clickCloseSessionButton(): void {
    this.punchoutFacade.closePunchoutSession().subscribe(() => {
      this.messageService.add('keyToDo', GlobalMessageType.MSG_TYPE_INFO);
      this.closeSessionTriggered = true;
    });
  }
}
