/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import { Command, CommandService, RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PunchoutFacade,
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
  PunchoutStoreService,
} from '@spartacus/punchout/root';

import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
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

  /**
   * getPunchoutSession workflow:
   * Get PunchoutSession from  occ api
   * Logout silently
   * Login silently
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
            !punchoutSession?.customerId
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

  getPunchoutSession(
    punchoutSessionInput: PunchoutSessionInput
  ): Observable<PunchoutSession> {
    return this.getPunchoutSessionCommand.execute(punchoutSessionInput);
  }

  getPunchoutSessionRequisition(
    sessionId: string
  ): Observable<PunchoutRequisition> {
    return this.punchoutConnector.getPunchoutSessionRequisition(sessionId);
  }

  protected routeToTargetPage(punchoutSession: PunchoutSession) {
    if (punchoutSession?.selectedItem) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code: punchoutSession.selectedItem },
      });
    } else {
      this.routingService.go('/');
    }
  }

  protected displayErrorPage() {
    this.routingService.go(PUNCHOUT_ERROR_PAGE_URL);
  }
}
