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
  OAuthLibWrapperService,
  RoutingService,
  tryNormalizeHttpError,
  UserIdService,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { B2bUnitSelectionConfig } from '../../../root/config/b2b-unit-selection.config';
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
  protected oAuthLibWrapperService = inject(OAuthLibWrapperService);

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
              defaultUnitUid: this.connector
                .loadDefaultOrgUnitUid(userId)
                .pipe(catchError(() => of(undefined))),
            }).pipe(
              tap(({ orgUnits, defaultUnitUid }) => {
                // Always write to the state service so the Company header selector is populated.
                this.stateService.setOrgUnits(orgUnits);
                this.stateService.setActiveUnit(defaultUnitUid ?? null);
                if (orgUnits.length > 0) {
                  this.openDialogWhenReady(orgUnits, defaultUnitUid);
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
   * On success, refreshes the token so the new unit's permissions take effect immediately,
   * then closes the dialog and updates the header selector state.
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
      switchMap(({ userId, unitUid, redirectToHome }) =>
        this.connector.setDefaultOrgUnit(userId, unitUid).pipe(
          tap(() => {
            // Refresh the token so the new unit's permission context takes effect (fire-and-forget).
            this.oAuthLibWrapperService.refreshToken();
            this.launchDialogService.closeDialog('CONFIRMED');
            this.stateService.setActiveUnit(unitUid);
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

  /**
   * Opens the unit-selection dialog once AppComponent is mounted.
   *
   * InlineRootRenderStrategy requires ApplicationRef.components[0] to be present.
   * - Already mounted (manual login): open immediately.
   * - Not yet mounted (OAuth Code Flow / token restore during APP_INITIALIZER):
   *   poll via requestAnimationFrame until Angular bootstraps AppComponent.
   */
  protected openDialogWhenReady(
    orgUnits: B2BUnit[],
    defaultUnitUid: string | undefined
  ): void {
    const open = () => {
      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.B2B_UNIT_SELECTION,
        undefined,
        { orgUnits, defaultUnitUid }
      );
    };

    if (this.applicationRef.components.length > 0) {
      open();
    } else {
      const poll = () => {
        if (this.applicationRef.components.length > 0) {
          open();
        } else {
          requestAnimationFrame(poll);
        }
      };
      requestAnimationFrame(poll);
    }
  }
}
