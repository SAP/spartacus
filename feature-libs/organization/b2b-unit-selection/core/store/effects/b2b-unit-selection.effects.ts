/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRef, inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  B2BUnit,
  LoggerService,
  tryNormalizeHttpError,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  defer,
  EMPTY,
  forkJoin,
  interval,
  Observable,
  of,
  race,
  timer,
} from 'rxjs';
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
  protected ngZone = inject(NgZone);
  protected stateService = inject(B2bUnitSelectorStateService);
  protected windowRef = inject(WindowRef);

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
   *
   * When the feature is disabled the effect factory returns EMPTY so NgRx never
   * subscribes to `actions$`.  A persistent `actions$` subscription keeps
   * Angular's zone perpetually unstable (via Zone.js-patched scheduler internals),
   * which prevents `ApplicationRef.isStable` from emitting `true` and causes
   * Cypress `cy.wait()` to time out even when no HTTP requests are issued.
   */
  checkOrgUnitsOnLogin$: Observable<
    | B2bUnitSelectionActions.LoadUserOrgUnitsSuccess
    | B2bUnitSelectionActions.LoadUserOrgUnitsFail
  > = createEffect(() => {
    if (!this.config.b2bUnitSelection?.enabled) {
      return defer(() => EMPTY);
    }
    return this.actions$.pipe(
      ofType<AuthActions.Login>(AuthActions.LOGIN),
      exhaustMap(() =>
        this.userIdService.takeUserId(true).pipe(
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
        )
      )
    );
  });

  /**
   * Listens for SET_DEFAULT_ORG_UNIT and calls the PUT API to persist the selection.
   * On success, closes the dialog, updates the header selector state, and reloads
   * the page so all org-context-dependent data (prices, catalog, CMS) is refreshed.
   *
   * Returns EMPTY when disabled so no `actions$` subscription is created.
   */
  setDefaultOrgUnit$: Observable<
    | B2bUnitSelectionActions.SetDefaultOrgUnitSuccess
    | B2bUnitSelectionActions.SetDefaultOrgUnitFail
  > = createEffect(() => {
    if (!this.config.b2bUnitSelection?.enabled) {
      return defer(() => EMPTY);
    }
    return this.actions$.pipe(
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
            // Reload the page so all org-context data is refreshed for the
            // newly selected unit.
            // Header selector: navigate to home root and trigger a full page
            // reload in one step via location.assign('/').
            // Dialog: reload the current page in-place via location.reload().
            if (redirectToHome) {
              this.windowRef.nativeWindow?.location?.assign('/');
            } else {
              this.windowRef.nativeWindow?.location?.reload();
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
    );
  });

  /**
   * Listens for LOGOUT and clears the state service so the Company selector
   * is hidden after the user logs out.
   *
   * Returns EMPTY when disabled so no `actions$` subscription is created.
   */
  clearOnLogout$ = createEffect(
    () => {
      if (!this.config.b2bUnitSelection?.enabled) {
        return defer(() => EMPTY);
      }
      return this.actions$.pipe(
        ofType<AuthActions.Logout>(AuthActions.LOGOUT),
        tap(() => {
          this.stateService.setOrgUnits([]);
          this.stateService.setActiveUnit(null);
        })
      );
    },
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
   * Polls `ApplicationRef.components` every 50 ms so the dialog opens as soon
   * as the root component is bootstrapped — typically within one or two ticks.
   *
   * The polling runs OUTSIDE Angular's zone via `NgZone.runOutsideAngular` so
   * the `setInterval` does not keep the zone perpetually unstable, which would
   * otherwise prevent `ApplicationRef.isStable` from emitting and block CMS
   * page rendering.
   *
   * A `timer(STABLE_TIMEOUT_MS)` fallback ensures the subscription always
   * completes even if AppComponent never mounts, preventing a memory leak.
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

    // Run the polling interval outside Angular's zone so the continuous
    // setInterval does not keep ApplicationRef.isStable from emitting true.
    this.ngZone.runOutsideAngular(() => {
      race(
        interval(50).pipe(
          startWith(0),
          filter(() => this.applicationRef.components.length > 0),
          take(1)
        ),
        timer(this.STABLE_TIMEOUT_MS)
      )
        .pipe(take(1))
        .subscribe(() => this.ngZone.run(() => open()));
    });
  }
}
