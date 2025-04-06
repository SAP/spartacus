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
  PUNCHOUT_REQUISITION_PAGE_URL,
  PunchoutFacade,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
  PunchoutSessionInput,
  PunchoutState,
  PunchoutStoreService,
} from '@spartacus/punchout/root';

import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  catchError,
  filter,
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
   * store of initial cart entries for EDIT mode
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
            if (
              punchoutSession.punchOutOperation === PunchOutOperation.EDIT &&
              punchoutSession?.cartId
            ) {
              this.setPunchoutInitialCart(punchoutSession.cartId);
            }
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

  /**
   * getPunchoutRequisition workflow:
   * Ensure user is logged-in
   * get punchoutSessionId from PunchoutState
   * Get PunchoutSessionRequisition from  occ api
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
        const punchoutSessionId = punchoutState?.punchoutSessionId;
        return punchoutSessionId
          ? this.punchoutConnector.getPunchoutSessionRequisition(
              punchoutSessionId,
              punchoutState?.cancelRequisition
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

  /**
   * closePunchoutSession workflow:
   * for EDIT operation:
   *  - Delete all cart entries
   *  - Restore initial cart entries
   *  - do same as 'back to requition' button
   * for CREATE operation:
   * - do same Cancel punchout button
   * for INSPECT opeation:
   * - do same as 'back to requition' button
   */

  protected closePunchoutSessionCommand: Command<undefined, boolean> =
    this.commandService.create(() => {
      return this.punchoutStoreService.getPunchoutState().pipe(
        take(1),
        switchMap((punchoutState) => {
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
              cancelRequisition: false,
            });
            return this.revertToInitialCart(punchoutState).pipe(
              switchMap(() =>
                this.ensureStableCart(
                  punchoutState.punchoutSession?.cartId as string
                )
              )
            );
          }
          return of(true);
        }),
        map(() => {
          this.routingService.go(PUNCHOUT_REQUISITION_PAGE_URL);
          return true;
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

  protected setPunchoutInitialCart(cartId: string): void {
    this.takeCart(cartId)
      .pipe(
        map((cart) => {
          return cart?.entries?.map((e) => {
            return {
              productCode: e.product?.code as string,
              quantity: e.quantity as number,
            };
          }) as { productCode: string; quantity: number }[] | undefined;
        })
      )
      .subscribe({
        next: (
          entries: { productCode: string; quantity: number }[] | undefined
        ) => {
          if (entries?.length) {
            this.punchoutStoreService.updatePunchoutState({
              punchoutInitialCart: { entries },
            });
          }
        },
      });
  }

  protected revertToInitialCart(state: PunchoutState): Observable<boolean> {
    if (!state?.punchoutSession?.cartId) {
      return of(true);
    }
    return this.takeCart(state.punchoutSession.cartId).pipe(
      switchMap((cart) => {
        cart?.entries?.forEach(() => {
          this.multiCartFacade.removeEntry(
            state.punchoutSession?.customerId as string,
            state.punchoutSession?.cartId as string,
            0
          );
        });
        if (state.punchoutInitialCart?.entries) {
          return this.ensureStableCart(
            state.punchoutSession?.cartId as string
          ).pipe(
            tap(() => {
              this.multiCartFacade.addEntries(
                state.punchoutSession?.customerId as string,
                state.punchoutSession?.cartId as string,
                state.punchoutInitialCart?.entries as {
                  productCode: string;
                  quantity: number;
                }[]
              );
            })
          );
        }
        return of(true);
      })
    );
  }

  protected takeCart(cartId: string): Observable<Cart> {
    return this.multiCartFacade.getCart(cartId).pipe(
      filter((cart) => cart !== undefined),
      take(1)
    );
  }

  protected ensureStableCart(cartId: string): Observable<boolean> {
    return this.multiCartFacade.isStable(cartId).pipe(
      filter((stable) => stable),
      take(1)
    );
  }
}
