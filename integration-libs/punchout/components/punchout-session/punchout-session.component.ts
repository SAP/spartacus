/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PUNCHOUT_SESSION_KEY, PunchoutFacade } from '@spartacus/punchout/root';
import { take } from 'rxjs';
@Component({
  selector: 'cx-punchout-session',
  template: ` <p>Punchout session loading</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutSessionComponent implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected location = inject(Location);
  protected punchoutFacade = inject(PunchoutFacade);

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((param: Params) => {
      const sid = param?.[PUNCHOUT_SESSION_KEY];
      if (sid) {
        this.cleanBrowserUrl();
        this.punchoutFacade.getPunchoutSession(sid).pipe(take(1)).subscribe();
      }
    });
  }
  protected cleanBrowserUrl() {
    // security purpose, remove sessionId from browser address bar.
    const fullUrl = window.location.href;
    const newUrl = fullUrl.split('?' + PUNCHOUT_SESSION_KEY)[0];
    this.location.replaceState(newUrl);
  }
}
