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
import {
  PUNCHOUT_SESSION_KEY,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { switchMap, take, tap } from 'rxjs';
import { PunchoutComponentService } from '../punchout.component.service';

@Component({
  selector: 'cx-punchout-session',
  template: ` <p>Punchout loading</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutSessionComponent implements OnInit {
  protected activatedRoute = inject(ActivatedRoute);
  protected punchoutService = inject(PunchoutComponentService);
  protected location = inject(Location);

  protected cleanBrowserUrl() {
    // security purpose, remove sessionId from browser address bar.
    const fullUrl = window.location.href;
    const newUrl = fullUrl.split('?' + PUNCHOUT_SESSION_KEY)[0];
    this.location.replaceState(newUrl);
  }

  ngOnInit(): void {
    console.log('PunchoutSessionComponent');
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((param: Params) => {
      param;
      const sid = param?.[PUNCHOUT_SESSION_KEY];
      if (sid) {
        this.cleanBrowserUrl();
        this.punchoutService
          .logout()
          .pipe(
            take(1),
            switchMap(() => this.punchoutService.getPunchoutSession(sid)),
            tap((punchoutSession: PunchoutSession) => {
              if (punchoutSession?.token?.accessToken) {
                this.punchoutService.loginWithToken(
                  punchoutSession.token.accessToken,
                  punchoutSession.customerId
                );
                this.punchoutService.routeToTargetPage(punchoutSession);
              }
              if (punchoutSession?.cartId) {
                this.punchoutService
                  .loadCart(punchoutSession.cartId)
                  .subscribe();
              }
            })
          )
          .subscribe((session) => {
            console.log('session: ', session);
          });
      }
      // this.punchoutService
      //   .logout()
      //   .pipe(delay(5000))
      //   .subscribe((res) => {
      //     console.log('logout res: ', res);

      //   });
      console.log('sid is ', sid);
    });
  }
}
