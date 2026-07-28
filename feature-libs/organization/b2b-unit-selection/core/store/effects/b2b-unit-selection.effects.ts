/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  B2BUnit,
  LoggerService,
  RoutingService,
  tryNormalizeHttpError,
  UserIdService,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, forkJoin, interval, Observable, of, race, timer } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { B2bUnitSelectionConfig } from '@spartacus/organization/b2b-unit-selection/root';
import { B2bUnitSelectionConnector } from '../../connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../services/b2b-unit-selector-state.service';
import * as B2bUnitSelectionActions from '../actions/b2b-unit-selection.actions';

@Injectable()
export class B2bUnitSelectionEffects {
  protected logger = inject(LoggerService);
  protected config = inject(B2bUnitSelectionConfig);
  protected applicationRef = inject(ApplicationRef);
  protected stateService = inject(B2bUnitSelectorStateService);
  protected routingService = inject(RoutingService);

  /**
   * Listens for the LOGIN action and loads the user's org units and default unit.
   * Opens the unit-selection dialog when the user belongs to more than one unit.
   *
   * Two login scenarios are handled:
   * 1. Manual login (ROPC — user submits the Spartacus login form):
   *    ApplicationRef.components already has mounted components; the dialog opens immediately.
   *
   * 2. OAuth Authorization Code Flow or page-refresh token restore:
   *    ApplicationRef.components may be empty; polling waits for AppComponent to mount
   *    before opening the dialog.
   */
  checkOrgUnitsOnLogin$: Observable<
    | B2bUnitSelectionActions.LoadUserOrgUnitsSuccess
    | B2bUnitSelectionActions.LoadUserOrgUnitsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthActions.Login>(AuthActions.LOGIN),
      exhaustMap(() => {
        if (!this.config.b2bUnitSelection?.enabled) {
          return EMPTY;
        }
        return this.userIdService.takeUserId(true).pipe(
          switchMap((userId) =>
            forkJoin({
              orgUnits: this.connector.loadOrgUnits(userId),
              // Gracefully degrade if loading the default unit fails — do not block the main flow.
              defaultUnitName: this.connector
                .loadDefaultOrgUnitName(userId)
                .pipe(catchError(() => of(undefined))),
            }).pipe(
              tap(({ orgUnits, defaultUnitName }) => {
                // Always write to the state service so the Company header selector is populated.
                this.stateService.setOrgUnits(orgUnits);
                this.stateService.setActiveUnit(defaultUnitName ?? null);
                if (orgUnits.length > 0) {
                  this.openDialogWhenReady(orgUnits, defaultUnitName);
                }
              }),
              map(
                ({ orgUnits }) =>
                  new B2bUnitSelectionActions.LoadUserOrgUnitsSuccess(orgUnits)
              ),
              catchError((error: HttpErrorResponse) =>
                of(
                  new B2bUnitSelectionActions.LoadUserOrgUnitsFail(
                    tryNormalizeHttpError(error, this.logger)
                  )
                )
              )
            )
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  /**
   * Listens for SET_DEFAULT_ORG_UNIT and calls the PUT API to persist the selection.
   * On success, closes the dialog, updates the header selector state, and navigates
   * home when triggered from the header selector (redirectToHome = true).
   */
  setDefaultOrgUnit$: Observable<
    | B2bUnitSelectionActions.SetDefaultOrgUnitSuccess
    | B2bUnitSelectionActions.SetDefaultOrgUnitFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<B2bUnitSelectionActions.SetDefaultOrgUnit>(
        B2bUnitSelectionActions.SET_DEFAULT_ORG_UNIT
      ),
      map(
        (action: B2bUnitSelectionActions.SetDefaultOrgUnit) => action.payload
      ),
      switchMap(({ userId, unitName, redirectToHome }) =>
        this.connector.setDefaultOrgUnit(userId, unitName).pipe(
          tap(() => {
            this.launchDialogService.closeDialog('CONFIRMED');
            this.stateService.setActiveUnit(unitName);
            // Only navigate home for header selector switches (redirectToHome=true);
            // dialog confirmations stay on the current page.
            if (redirectToHome) {
              this.routingService.go({ cxRoute: 'home' });
            }
          }),
          map(() => new B2bUnitSelectionActions.SetDefaultOrgUnitSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              new B2bUnitSelectionActions.SetDefaultOrgUnitFail(
                tryNormalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );

  /**
   * Listens for LOGOUT and clears the state service so the Company selector
   * is hidden after the user logs out.
   */
  clearOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AuthActions.Logout>(AuthActions.LOGOUT),
        tap(() => {
          this.stateService.setOrgUnits([]);
          this.stateService.setActiveUnit(null);
        })
      ),
    { dispatch: false }
  );

  constructor(
    protected actions$: Actions,
    protected connector: B2bUnitSelectionConnector,
    protected userIdService: UserIdService,
    protected launchDialogService: LaunchDialogService
  ) {}

  /** Maximum time (ms) to wait for AppComponent to mount before opening the dialog anyway. */
  protected readonly STABLE_TIMEOUT_MS = 10_000;

  /**
   * Opens the unit-selection dialog once the AppComponent is mounted.
   *
   * Polls `ApplicationRef.components` every 50 ms (with an immediate synchronous
   * check via `startWith(0)`) so the dialog opens as soon as the root component
   * is bootstrapped — typically within one or two ticks after login.
   *
   * Using `ApplicationRef.isStable` instead would delay the dialog by several
   * seconds because it waits for ALL Zone tasks (routing, HTTP, etc.) to drain.
   *
   * A `timer(STABLE_TIMEOUT_MS)` fallback ensures the subscription always
   * completes even if AppComponent never mounts (e.g. an error during bootstrap),
   * preventing a memory leak.
   */
  protected openDialogWhenReady(
    orgUnits: B2BUnit[],
    defaultUnitName: string | undefined
  ): void {
    const open = () => {
      this.launchDialogService.openDialogAndSubscribe(
        (LAUNCH_CALLER as any)['B2B_UNIT_SELECTION'],
        undefined,
        { orgUnits, defaultUnitName }
      );
    };

    // Poll until AppComponent is mounted, then open immediately.
    // startWith(0) performs a synchronous check — if components are already
    // present (manual ROPC login), the dialog opens without any async delay.
    race(
      interval(50).pipe(
        startWith(0),
        filter(() => this.applicationRef.components.length > 0),
        take(1)
      ),
      timer(this.STABLE_TIMEOUT_MS)
    )
      .pipe(take(1))
      .subscribe(() => open());
  }
}
