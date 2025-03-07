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
  PunchoutStoreService,
} from '@spartacus/punchout/root';

import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { PunchoutConnector } from '../connectors';
import { PunchoutAuthService } from '../services';

@Injectable()
export class PunchoutService implements PunchoutFacade {
  protected punchoutConnector = inject(PunchoutConnector);
  protected punchoutAuthService = inject(PunchoutAuthService);
  protected commandService = inject(CommandService);
  protected routingService = inject(RoutingService);
  protected punchoutStoreService = inject(PunchoutStoreService);

  protected getPunchoutSessionCommand: Command<
    { sessionId: string },
    PunchoutSession
  > = this.commandService.create((payload) => {
    let punchoutSession: PunchoutSession;
    return this.punchoutConnector.getPunchoutSession(payload.sessionId).pipe(
      tap((session) => (punchoutSession = session)),
      switchMap(() => this.punchoutAuthService.logout()),
      catchError((error) => {
        this.displayErrorPage();
        return throwError(() => error);
      }),
      tap(() => {
        if (punchoutSession?.token?.accessToken) {
          this.punchoutAuthService.loginWithToken(
            punchoutSession.token.accessToken,
            punchoutSession.customerId
          );
          this.punchoutStoreService.setPunchoutState({
            sId: payload.sessionId,
            session: punchoutSession,
          });
          this.routeToTargetPage(punchoutSession);
        } else {
          this.displayErrorPage();
        }
      }),
      map(() => punchoutSession)
    );
  });

  getPunchoutSession(sessionId: string): Observable<PunchoutSession> {
    return this.getPunchoutSessionCommand.execute({ sessionId });
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
        params: { code: punchoutSession?.selectedItem },
      });
    } else {
      this.routingService.go('/');
    }
  }

  protected displayErrorPage() {
    this.routingService.go(PUNCHOUT_ERROR_PAGE_URL);
  }
}
