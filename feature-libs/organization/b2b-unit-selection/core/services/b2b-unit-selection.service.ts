/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationRef, inject, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  B2BUnit,
  EventService,
  LoggerService,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  tryNormalizeHttpError,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  B2bUnitSelectionConfig,
  B2bUnitSwitchedEvent,
  B2bUnitSwitchFailedEvent,
} from '@spartacus/organization/b2b-unit-selection/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { forkJoin, interval, of, race, Subscription, timer } from 'rxjs';
import {
  catchError,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { B2bUnitSelectionConnector } from '../connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from './b2b-unit-selector-state.service';

/**
 * Core service orchestrating B2B unit selection.
 *
 * Replaces the previous NgRx-effects-based implementation. By using
 * `EventService` subscriptions instead of `EffectsModule.forFeature`, we
 * eliminate the Zone.js pending-task that NgRx's `EffectSources.toActions()`
 * creates for the lifetime of the application — a task that prevented
 * `ApplicationRef.isStable` from emitting `true` and caused Cypress
 * `cy.wait()` calls to time out in CI.
 *
 * **Lifecycle:** Eagerly initialised by `B2bUnitSelectionCoreModule` via
 * constructor injection. Subscriptions are set up in the constructor and
 * live for the application lifetime (no `ngOnDestroy` needed for a root
 * singleton).
 */
@Injectable({ providedIn: 'root' })
export class B2bUnitSelectionService {
  protected logger = inject(LoggerService);
  protected config = inject(B2bUnitSelectionConfig);
  protected applicationRef = inject(ApplicationRef);
  protected ngZone = inject(NgZone);
  protected stateService = inject(B2bUnitSelectorStateService);
  protected windowRef = inject(WindowRef);
  protected eventService = inject(EventService);
  protected userIdService = inject(UserIdService);
  protected connector = inject(B2bUnitSelectionConnector);
  protected launchDialogService = inject(LaunchDialogService);

  /** Maximum time (ms) to wait for AppComponent to mount before opening the dialog anyway. */
  protected readonly STABLE_TIMEOUT_MS = 10_000;

  private readonly subscriptions = new Subscription();

  constructor() {
    if (!this.config.b2bUnitSelection?.enabled) {
      return;
    }
    this.subscribeToLogin();
    this.subscribeToLogout();
  }

  /**
   * Listens for `LoginEvent` and loads the user's org units and default unit.
   * Opens the unit-selection dialog when the user belongs to more than one unit.
   *
   * Two login scenarios are handled:
   * 1. Manual login (ROPC): `ApplicationRef.components` already has mounted
   *    components; the dialog opens immediately.
   * 2. OAuth Authorization Code Flow or page-refresh token restore:
   *    `ApplicationRef.components` may be empty; polling waits for AppComponent
   *    to mount before opening the dialog.
   */
  protected subscribeToLogin(): void {
    this.subscriptions.add(
      this.eventService
        .get(LoginEvent)
        .pipe(
          switchMap(() =>
            this.userIdService.getUserId().pipe(
              filter((userId) => userId !== OCC_USER_ID_ANONYMOUS),
              take(1),
              switchMap((userId) =>
                forkJoin({
                  orgUnits: this.connector.loadOrgUnits(userId),
                  // Gracefully degrade if loading the default unit fails.
                  defaultUnitName: this.connector
                    .loadDefaultOrgUnitName(userId)
                    .pipe(catchError(() => of(undefined))),
                }).pipe(
                  tap(({ orgUnits, defaultUnitName }) => {
                    // Always write to the state service so the Company header
                    // selector is populated.
                    this.stateService.setOrgUnits(orgUnits);
                    this.stateService.setActiveUnit(defaultUnitName ?? null);
                    if (orgUnits.length > 0) {
                      this.openDialogWhenReady(orgUnits, defaultUnitName);
                    }
                  }),
                  catchError((error: HttpErrorResponse) => {
                    this.logger.error(
                      tryNormalizeHttpError(error, this.logger)
                    );
                    return of(null);
                  })
                )
              )
            )
          )
        )
        .subscribe()
    );
  }

  /**
   * Listens for `LogoutEvent` and clears the state service so the Company
   * selector is hidden after the user logs out.
   */
  protected subscribeToLogout(): void {
    this.subscriptions.add(
      this.eventService
        .get(LogoutEvent)
        .pipe(
          tap(() => {
            this.stateService.setOrgUnits([]);
            this.stateService.setActiveUnit(null);
          })
        )
        .subscribe()
    );
  }

  /**
   * Calls the connector to persist the newly selected org unit, then
   * closes the dialog / reloads the page so all org-context-dependent data
   * (prices, catalog, CMS) is refreshed.
   *
   * @param userId       The OCC user identifier.
   * @param unitName     The `name` of the selected B2B unit.
   * @param redirectToHome  When `true` (header selector), navigates to the
   *                     home root; when `false` / omitted (dialog), reloads
   *                     the current page in place.
   */
  setDefaultUnit(
    userId: string,
    unitName: string,
    redirectToHome?: boolean
  ): void {
    this.connector
      .setDefaultOrgUnit(userId, unitName)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.launchDialogService.closeDialog('CONFIRMED');
          this.stateService.setActiveUnit(unitName);
          this.eventService.dispatch(
            { userId, unitName, redirectedToHome: redirectToHome ?? false },
            B2bUnitSwitchedEvent
          );
          // Reload page so all org-context data is refreshed for the new unit.
          // Header selector: navigate to home root via location.assign('/').
          // Dialog: reload the current page in-place via location.reload().
          if (redirectToHome) {
            this.windowRef.nativeWindow?.location?.assign('/');
          } else {
            this.windowRef.nativeWindow?.location?.reload();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.eventService.dispatch(
            {
              userId,
              unitName,
              error: tryNormalizeHttpError(error, this.logger),
            },
            B2bUnitSwitchFailedEvent
          );
        },
      });
  }

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

    this.ngZone.runOutsideAngular(() => {
      race(
        interval(50).pipe(
          startWith(0),
          filter(() => this.applicationRef.components.length > 0),
          take(1)
        ),
        timer(this.STABLE_TIMEOUT_MS)
      ).subscribe(() => this.ngZone.run(() => open()));
    });
  }
}
