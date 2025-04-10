/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { PUNCHOUT_SESSION_KEY, PunchoutFacade } from '@spartacus/punchout/root';
import { switchMap, take } from 'rxjs';
@Component({
  selector: 'cx-punchout-session',
  template: `<p>Punchout session loading</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutSessionComponent implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected punchoutFacade = inject(PunchoutFacade);

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        switchMap((param: Params) =>
          this.punchoutFacade.getPunchoutSession({
            punchoutSessionId: param?.[PUNCHOUT_SESSION_KEY],
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
