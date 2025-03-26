/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import {
  Command,
  CommandService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PunchoutFacade,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';

import { MultiCartFacade } from '@spartacus/cart/base/root';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { PunchoutConnector } from '../connectors';
import { PunchoutAuthService } from '../services';

@Injectable()
export class PunchoutService implements PunchoutFacade {
  protected punchoutConnector = inject(PunchoutConnector);
  protected punchoutAuthService = inject(PunchoutAuthService);
  protected commandService = inject(CommandService);
  protected routingService = inject(RoutingService);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);

  /**
   * getPunchoutSession workflow:
   * Get PunchoutSession from  occ api
   * Logout silently
   * Login silently
   * Load Cart
   * Route to target page based on punchout session info
   * Redirect to Punchout Error page if error occurs
   */
  protected getPunchoutSessionCommand: Command<
    PunchoutSessionInput,
    PunchoutSession
  > = this.commandService.create((payload) => {
    if (!payload?.punchoutSessionId) {
      this.displayErrorPage();
      return throwError(() => new Error('Punchout Session Id missing'));
    }
    return this.punchoutConnector
      .getPunchoutSession(payload.punchoutSessionId)
      .pipe(
        map((punchoutSession) => {
          if (
            !punchoutSession?.token?.accessToken ||
            !punchoutSession?.customerId ||
            !punchoutSession?.cartId
          ) {
            throw new Error('Punchout login info missing');
          }
          return punchoutSession;
        }),
        switchMap((punchoutSession) => {
          return forkJoin({
            punchoutSession: of(punchoutSession),
            logout: this.punchoutAuthService.logout(),
          });
        }),
        map(({ punchoutSession }) => {
          if (punchoutSession?.token?.accessToken) {
            this.punchoutAuthService.loginWithToken(
              punchoutSession.token.accessToken,
              punchoutSession.customerId
            );
            this.loadCart(punchoutSession.cartId).subscribe();
            this.punchoutStoreService.setPunchoutState({
              punchoutSessionId: payload.punchoutSessionId,
              punchoutSession: { ...punchoutSession },
            });
            if (!payload?.isPageRefresh) {
              this.routeToTargetPage(punchoutSession);
            }
          } else {
            throw new Error('Punchout Access Token missing');
          }

          return punchoutSession;
        }),
        catchError((error) => {
          this.displayErrorPage();
          return throwError(() => new Error(error));
        })
      );
  });

  protected getPunchoutRequisitionCommand: Command<
    undefined,
    PunchoutRequisition
  > = this.commandService.create(() => {
    return this.punchoutAuthService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? this.punchoutStoreService.getPunchoutState()
          : throwError(() => new Error('User not loggedIn'));
      }),
      // return this.punchoutStoreService.getPunchoutState().pipe(
      take(1),
      switchMap((punchoutState: PunchoutState) => {
        const punchoutSessionId = punchoutState?.punchoutSessionId;
        return punchoutSessionId
          ? this.punchoutConnector.getPunchoutSessionRequisition(
              punchoutSessionId
            )
          : throwError(() => new Error('Punchout Session Id missing'));
      }),
      catchError((error) => {
        this.displayErrorPage();
        return throwError(() => new Error(error));
      })
    );
  });

  protected logoutPunchoutUserCommand: Command<undefined, boolean> =
    this.commandService.create(() => {
      return this.punchoutAuthService.logout();
    });

  getPunchoutSession(
    punchoutSessionInput: PunchoutSessionInput
  ): Observable<PunchoutSession> {
    return this.getPunchoutSessionCommand.execute(punchoutSessionInput);
  }

  getPunchoutSessionRequisition(): Observable<PunchoutRequisition | undefined> {
    return this.getPunchoutRequisitionCommand.execute(undefined);
  }

  logoutPunchoutUser(): Observable<boolean> {
    return this.logoutPunchoutUserCommand.execute(undefined);
  }

  protected routeToTargetPage(punchoutSession: PunchoutSession) {
    if (punchoutSession?.selectedItem) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code: punchoutSession.selectedItem },
      });
      return;
    }
    if (punchoutSession?.punchOutOperation === PunchOutOperation.EDIT) {
      this.routingService.go({ cxRoute: 'cart' });
      return;
    }
    this.routingService.go('/');
  }

  protected displayErrorPage() {
    this.routingService.go(PUNCHOUT_ERROR_PAGE_URL);
  }

  protected loadCart(cartId: string): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      tap((userId) => {
        this.multiCartFacade.loadCart({
          userId,
          cartId,
          extraData: {
            active: true,
          },
        });
      })
    );
  }
}
