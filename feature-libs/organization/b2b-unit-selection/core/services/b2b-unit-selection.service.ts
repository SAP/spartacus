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
  distinctUntilChanged,
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
 * Provided in the lazy `B2bUnitSelectionCoreModule` (not `providedIn: 'root'`)
 * so that it lives in the same injector as `B2bUnitSelectionConnector` and
 * `B2bUnitSelectionAdapter`, avoiding cross-injector dependency errors.
 *
 * Eagerly initialised by `B2bUnitSelectionCoreModule` via constructor injection.
 * By using `UserIdService.getUserId()` instead of `LoginEvent` / `LogoutEvent`,
 * the service reacts correctly whether it is instantiated before or after the
 * auth token is restored from storage.
 *
 * **Dialog communication:** The dialog component (`B2bUnitSelectionDialogComponent`)
 * does not inject this service directly (it is module-scoped and lives in a lazy
 * child injector, while the dialog is rendered in the root outlet). Instead, the
 * dialog calls `LaunchDialogService.closeDialog(unitName)` with the selected unit
 * name, and this service subscribes to `LaunchDialogService.dialogClose` after
 * opening the dialog to receive the result.
 */
@Injectable()
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

  /**
   * sessionStorage key used to suppress the unit-selection dialog after the
   * user has already confirmed a unit in the current browser session.
   * Cleared on logout so the dialog reappears on the next login.
   */
  protected readonly UNIT_CONFIRMED_SESSION_KEY = 'cx-b2b-unit-selected';

  private readonly subscriptions = new Subscription();

  constructor() {
    if (!this.config.b2bUnitSelection?.enabled) {
      return;
    }
    this.subscribeToUserIdChanges();
  }

  /**
   * Reacts to every distinct change of the active user ID.
   *
   * - **Login** (userId transitions from anonymous → real ID): loads the
   *   user's org units and opens the unit-selection dialog when the user
   *   belongs to more than one unit.
   * - **Logout** (userId transitions to anonymous / empty): clears the state
   *   so the Company header selector is hidden.
   *
   * Using `getUserId()` (a `BehaviorSubject`) instead of `LoginEvent` /
   * `LogoutEvent` (plain `Subject`s) makes the service robust to lazy-loading
   * timing: if the feature module loads after the auth token has already been
   * restored from storage, `getUserId()` immediately emits the current user ID
   * and the dialog still opens correctly.
   */
  protected subscribeToUserIdChanges(): void {
    this.subscriptions.add(
      this.userIdService
        .getUserId()
        .pipe(
          distinctUntilChanged(),
          tap((userId) => {
            if (!userId || userId === OCC_USER_ID_ANONYMOUS) {
              this.stateService.setOrgUnits([]);
              this.stateService.setActiveUnit(null);
              // Clear the session flag so the dialog appears again on next login.
              this.windowRef.sessionStorage?.removeItem(
                this.UNIT_CONFIRMED_SESSION_KEY
              );
            }
          }),
          filter((userId) => !!userId && userId !== OCC_USER_ID_ANONYMOUS),
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
                // Open the dialog when the user has multiple org units to
                // choose from and has NOT already confirmed a unit in this
                // browser session (flag is set in setDefaultUnit and cleared
                // on logout, preventing the dialog from reopening after the
                // post-confirm page reload).
                const alreadyConfirmed =
                  this.windowRef.sessionStorage?.getItem(
                    this.UNIT_CONFIRMED_SESSION_KEY
                  ) === 'true';
                if (orgUnits.length > 1 && !alreadyConfirmed) {
                  this.openDialogWhenReady(orgUnits, defaultUnitName, userId);
                }
              }),
              catchError((error: HttpErrorResponse) => {
                this.logger.error(tryNormalizeHttpError(error, this.logger));
                return of(null);
              })
            )
          )
        )
        .subscribe()
    );
  }

  /**
   * Calls the connector to persist the newly selected org unit, then
   * closes the dialog and reloads the page so all org-context-dependent data
   * (prices, catalog, CMS) is refreshed.
   *
   * Called either from the dialog flow (via the `onConfirm` callback passed in
   * dialog data) or directly from the header selector component.
   *
   * @param userId          The OCC user identifier.
   * @param unitName        The `name` of the selected B2B unit.
   * @param redirectToHome  When `true` (header selector), navigates to the
   *                        home root; when `false` (dialog, default), reloads
   *                        the current page in place.
   */
  setDefaultUnit(
    userId: string,
    unitName: string,
    redirectToHome = false
  ): void {
    this.connector
      .setDefaultOrgUnit(userId, unitName)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.launchDialogService.closeDialog('CONFIRMED');
          this.stateService.setActiveUnit(unitName);
          this.eventService.dispatch(
            { userId, unitName, redirectedToHome: redirectToHome },
            B2bUnitSwitchedEvent
          );
          // Persist the session flag before reloading so the dialog does not
          // reopen when the page reinitialises with the same user ID.
          this.windowRef.sessionStorage?.setItem(
            this.UNIT_CONFIRMED_SESSION_KEY,
            'true'
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
   * The dialog component (`B2bUnitSelectionDialogComponent`) is standalone and
   * rendered in the root outlet via `inlineRoot: true`. Because this service
   * lives in the lazy feature module's child injector, the dialog cannot inject
   * it directly. Instead, an `onConfirm` callback is passed via the dialog data
   * payload. The dialog calls this callback with the selected unit name, which
   * in turn calls `setDefaultUnit` — which closes the dialog via
   * `LaunchDialogService.closeDialog` on HTTP success, preserving the original
   * close-after-persist behaviour.
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
    defaultUnitName: string | undefined,
    userId: string
  ): void {
    const open = () => {
      this.launchDialogService.openDialogAndSubscribe(
        (LAUNCH_CALLER as any)['B2B_UNIT_SELECTION'],
        undefined,
        {
          orgUnits,
          defaultUnitName,
          // Pass a bound callback so the dialog can trigger setDefaultUnit
          // without injecting this module-scoped service directly.
          onConfirm: (unitName: string) =>
            this.setDefaultUnit(userId, unitName),
        }
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
