/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';

import {
  Command,
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  PUNCHOUT_INSPECT_PAGE_URL,
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutFacade,
  PunchOutLevel,
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
  protected globalMessageService = inject(GlobalMessageService);

  /**
   * punchoutSession ajax request will always return same response during a punchout session.
   * To avoid multiple server calls, punchoutSession OCC API response  is stored into cachedPunchoutSessionResponse.
   */
  protected cachedPunchoutSessionResponse?: PunchoutSession;

  /**
   * getPunchoutSession workflow:
   * Logout silently
   * Get PunchoutSession from  occ api
   * Login silently
   * Load Cart
   * Only for EDIT mode: Fetch Requisition to store initial cart in CXML format.
   * Route to target page based on punchout session info
   * Redirect to Punchout Error page if error occurs
   */
  protected getPunchoutSessionCommand: Command<
    PunchoutSessionInput,
    PunchoutSession
  > = this.commandService.create((payload) => {
    if (!payload?.punchoutSessionId) {
      this.punchoutAuthService.endPunchoutSession();
      return throwError(() => new Error('Punchout Session Id missing'));
    }

    return this.punchoutAuthService.silentLogout(payload?.isPageRefresh).pipe(
      switchMap(() => this.requestPunchoutSession(payload.punchoutSessionId)),
      map((punchoutSession) => {
        if (punchoutSession?.token?.accessToken) {
          this.punchoutAuthService.loginWithToken(
            punchoutSession.token.accessToken
          );
          this.loadCart(punchoutSession.cartId).subscribe();
          this.punchoutStoreService.setPunchoutState({
            punchoutSessionId: payload.punchoutSessionId,
            punchoutSession: { ...punchoutSession },
          });
          if (
            punchoutSession.punchOutOperation === PunchOutOperation.EDIT &&
            punchoutSession?.cartId &&
            !payload?.isPageRefresh
          ) {
            this.setPunchoutInitialRequisition();
          }
          if (!payload?.isPageRefresh) {
            this.routeToTargetPage(punchoutSession);
          }
        }

        return punchoutSession;
      }),
      catchError((error) => {
        this.punchoutAuthService.endPunchoutSession();
        return throwError(() => new Error(error));
      })
    );
  });

  /**
   * getPunchoutRequisition workflow:
   * Ensure user is logged-in
   * get punchoutSessionId from PunchoutState
   * Get PunchoutSessionRequisition from  occ api OR from PunchoutState
   * Redirect to Punchout Error page if error occurs
   */

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
      take(1),
      switchMap((punchoutState: PunchoutState) => {
        // prevent manual navigation to requisition page
        if (
          punchoutState?.closePunchoutSession === undefined &&
          punchoutState?.cancelRequisition === undefined
        ) {
          this.globalMessageService.add(
            {
              key: 'organization.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
          this.routingService.go({ cxRoute: 'home' });
          return of();
        }
        // scenario where user pressed 'Close punchout session' button in EDIT Cart mode
        // initial cart requisition is returned to ARIBA
        if (
          punchoutState?.closePunchoutSession &&
          punchoutState?.punchoutInitialRequisition?.browseFormPostUrl &&
          punchoutState.punchoutInitialRequisition?.orderAsCXML
        ) {
          return of({ ...punchoutState.punchoutInitialRequisition });
        }
        const punchoutSessionId = punchoutState?.punchoutSessionId;
        return punchoutSessionId
          ? this.punchoutConnector.getPunchoutSessionRequisition(
              punchoutSessionId,
              punchoutState?.cancelRequisition
            )
          : throwError(() => new Error('Punchout Session Id missing'));
      }),
      catchError((error) => {
        this.punchoutAuthService.endPunchoutSession();
        return throwError(() => new Error(error));
      })
    );
  });

  /**
   * logoutPunchoutUser workflow:
   * clear punchout state
   * silent logout, meaning no notification displayed and redirection.
   */
  protected logoutPunchoutUserCommand: Command<void, boolean> =
    this.commandService.create(() => this.punchoutAuthService.silentLogout());

  /**
   * endUserSession workflow:
   * clear punchout state,logout, redirect to login page, display message
   */
  protected endPunchoutSessionCommand: Command<void> =
    this.commandService.create<void>(() =>
      of(true).pipe(
        tap(() => {
          this.punchoutAuthService.endPunchoutSession();
        })
      )
    );

  /**
   * closePunchoutSession workflow:
   * For EDIT operation:
   * - Initial cart snapshot gets sent in CXML, driven by closePunchoutSession flag.
   * For CREATE operation:
   * - Empty cart gets sent in CXML, driven by cancelRequisition flag.
   * For INSPECT operation:
   * - Current cart gets sent in CXML.
   */

  protected closePunchoutSessionCommand: Command<undefined, boolean> =
    this.commandService.create(() => {
      return this.punchoutStoreService.getPunchoutState().pipe(
        take(1),
        map((punchoutState) => {
          if (
            punchoutState.punchoutSession?.punchOutOperation ===
            PunchOutOperation.CREATE
          ) {
            this.punchoutStoreService.updatePunchoutState({
              cancelRequisition: true,
            });
          } else if (
            punchoutState.punchoutSession?.punchOutOperation ===
            PunchOutOperation.EDIT
          ) {
            this.punchoutStoreService.updatePunchoutState({
              closePunchoutSession: true,
            });
          }
          this.openRequisitionPage();
          return true;
        }),
        catchError((error) => {
          this.punchoutAuthService.endPunchoutSession();
          return throwError(() => new Error(error));
        })
      );
    });

  /**
   * Request Punchout session calling occ api.
   * Returns cached value if server request has been already made.
   * @param punchoutSessionId
   * @returns
   */

  protected requestPunchoutSessionCommand: Command<string, PunchoutSession> =
    this.commandService.create((punchoutSessionId: string) => {
      return this.cachedPunchoutSessionResponse
        ? of(this.cachedPunchoutSessionResponse)
        : this.punchoutConnector.getPunchoutSession(punchoutSessionId).pipe(
            map((punchoutSession) => {
              if (
                !punchoutSession?.token?.accessToken ||
                !punchoutSession?.customerId ||
                !punchoutSession?.cartId
              ) {
                throw new Error('Punchout login info missing');
              }
              this.cachedPunchoutSessionResponse = {
                ...punchoutSession,
                token: { ...punchoutSession.token },
              };
              return punchoutSession;
            })
          );
    });

  closePunchoutSession(): Observable<boolean> {
    return this.closePunchoutSessionCommand.execute(undefined);
  }

  getPunchoutSession(
    punchoutSessionInput: PunchoutSessionInput
  ): Observable<PunchoutSession> {
    return this.getPunchoutSessionCommand.execute(punchoutSessionInput);
  }

  getPunchoutSessionRequisition(): Observable<PunchoutRequisition | undefined> {
    return this.getPunchoutRequisitionCommand.execute(undefined);
  }

  logoutPunchoutUser(): Observable<boolean> {
    return this.logoutPunchoutUserCommand.execute();
  }

  endPunchoutSession(): Observable<unknown> {
    return this.endPunchoutSessionCommand.execute();
  }

  requestPunchoutSession(
    punchoutSessionId: string
  ): Observable<PunchoutSession> {
    return this.requestPunchoutSessionCommand.execute(punchoutSessionId);
  }

  submitRequisition(cancelRequisition: boolean): void {
    this.punchoutStoreService.updatePunchoutState({ cancelRequisition });
    this.openRequisitionPage();
  }

  protected routeToTargetPage(punchoutSession: PunchoutSession) {
    if (
      (punchoutSession?.punchOutOperation === PunchOutOperation.CREATE ||
        punchoutSession?.punchOutOperation === PunchOutOperation.EDIT) &&
      punchoutSession?.punchOutLevel === PunchOutLevel.PRODUCT &&
      punchoutSession?.selectedItem
    ) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code: punchoutSession.selectedItem, name: '' },
      });
      return;
    }
    if (punchoutSession?.punchOutOperation === PunchOutOperation.EDIT) {
      this.routingService.go({ cxRoute: 'cart' });
      return;
    }
    if (punchoutSession?.punchOutOperation === PunchOutOperation.INSPECT) {
      this.routingService.go(PUNCHOUT_INSPECT_PAGE_URL);
      return;
    }
    this.routingService.go('/');
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

  protected setPunchoutInitialRequisition(): void {
    this.getPunchoutSessionRequisition()
      .pipe(take(1))
      .subscribe({
        next: (punchoutRequisition) => {
          if (punchoutRequisition) {
            this.punchoutStoreService.updatePunchoutState({
              punchoutInitialRequisition: { ...punchoutRequisition },
            });
          }
        },
      });
  }

  protected openRequisitionPage(): void {
    this.globalMessageService.add(
      {
        key: 'punchout.redirectToProcurementSystem',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
    this.routingService.go(PUNCHOUT_REQUISITION_PAGE_URL);
  }
}
