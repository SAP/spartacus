/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { AuthService, EventService, RoutingService } from '@spartacus/core';
import { PunchoutFacade, PunchoutStoreService } from '@spartacus/punchout/root';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'cx-punchout-close-session',
  templateUrl: './punchout-close-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutCloseSessionComponent {
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);
  protected authService = inject(AuthService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected eventService = inject(EventService);
  protected subscription = new Subscription();
  protected punchoutFacade = inject(PunchoutFacade);

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

  clickCloseSessionButton(): void {
    this.punchoutFacade.closePunchoutSession().subscribe();
  }
}
