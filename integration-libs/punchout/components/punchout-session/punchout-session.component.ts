/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { PunchoutFacade } from '@spartacus/punchout/root';
import { switchMap, take } from 'rxjs';
@Component({
  selector: 'cx-punchout-session',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PunchoutSessionComponent implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected punchoutFacade = inject(PunchoutFacade);
  protected globalMessageService = inject(GlobalMessageService);

  protected readonly PUNCHOUT_SESSION_KEY = 'sid';

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        switchMap((params: Params) => {
          this.globalMessageService.add(
            {
              key: 'punchout.initiatingUserSession',
            },
            GlobalMessageType.MSG_TYPE_INFO
          );
          return this.punchoutFacade.initPunchoutSession({
            punchoutSessionId: params?.[this.PUNCHOUT_SESSION_KEY],
          });
        }),
        take(1)
      )
      .subscribe({
        complete: () => {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_INFO);
        },
      });
  }
}
