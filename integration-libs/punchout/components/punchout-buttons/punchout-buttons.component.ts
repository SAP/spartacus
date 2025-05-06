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
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { PunchoutStoreService } from '@spartacus/punchout/root';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'cx-punchout-buttons',
  templateUrl: './punchout-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutButtonsComponent {
  @Input() removeCancelButton = false;

  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);
  protected messageService = inject(GlobalMessageService);
  protected closeSessionTriggered = false;

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

  submitRequisition(cancelRequisition = false): void {
    this.punchoutStoreService.updatePunchoutState({ cancelRequisition });
    this.messageService.add('keyToDo', GlobalMessageType.MSG_TYPE_INFO);
    this.closeSessionTriggered = true;
  }
}
