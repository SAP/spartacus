/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  computed,
  Directive,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { B2BUnit, UserIdService } from '@spartacus/core';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import {
  B2bUnitSelectionConnector,
  B2bUnitSelectorStateService,
  SetDefaultOrgUnit,
} from '@spartacus/organization/b2b-unit-selection/core';
import { B2bUnitSelectionConfig } from '@spartacus/organization/b2b-unit-selection/root';

/**
 * Abstract base class encapsulating state and interaction logic for the Company selector.
 * Subclasses only need to provide the selector and template.
 *
 * On init, if the stateService holds no data (e.g. after a page refresh before effects
 * have written), it proactively calls the connector to ensure the selector renders correctly.
 */
@Directive()
export abstract class AbstractB2bUnitSelectorComponent implements OnInit {
  protected stateService = inject(B2bUnitSelectorStateService);
  protected store = inject(Store);
  protected userIdService = inject(UserIdService);
  protected connector = inject(B2bUnitSelectionConnector);
  protected config = inject(B2bUnitSelectionConfig);
  protected ngZone = inject(NgZone);

  /**
   * Whether the B2B unit selection feature is enabled.
   * Evaluated once at construction time so signal creation can be gated on it.
   */
  protected readonly enabled = this.config.b2bUnitSelection?.enabled ?? false;

  /**
   * All assignable B2B units for the current user.
   *
   * When the feature is disabled we use a static `signal([])` rather than
   * `toSignal(observable)` to avoid creating any RxJS subscription.  In
   * Angular 21 the signal-reactive scheduler (backed by `queueMicrotask`)
   * is patched by Zone.js; a live `toSignal` subscription can therefore
   * prevent `ApplicationRef.isStable` from emitting `true`, which in turn
   * blocks Cypress' `cy.wait()` from resolving — causing test timeouts even
   * when `enabled = false` and no HTTP requests are issued.
   */
  readonly items = this.enabled
    ? toSignal(this.stateService.orgUnits$, { initialValue: [] as B2BUnit[] })
    : signal([] as B2BUnit[]);

  /** Currently active (default) unit name. */
  readonly activeUnitName = this.enabled
    ? toSignal(this.stateService.activeUnitName$, {
        initialValue: null as string | null,
      })
    : signal(null as string | null);

  /** True when the user has more than one unit — selector is interactive. */
  readonly hasMultipleUnits = computed(() => this.items().length > 1);

  /** True when the user has at least one unit — selector is rendered (disabled for single unit). */
  readonly hasAnyUnit = computed(() => this.items().length > 0);

  ngOnInit(): void {
    if (!this.enabled) {
      return;
    }
    // After a page refresh the BehaviorSubject is empty (effects may not have written yet).
    // Proactively load once to ensure the selector is populated.
    this.stateService.orgUnits$.pipe(take(1)).subscribe((units) => {
      if (units.length === 0) {
        this.loadAndPopulateState();
      }
    });
  }

  /** Dispatches SetDefaultOrgUnit when the user switches units via the header selector. */
  onSelect(unitName: string): void {
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(
          new SetDefaultOrgUnit({
            userId,
            unitName,
            redirectToHome: true,
          })
        );
      });
  }

  private loadAndPopulateState(): void {
    // Run the HTTP requests outside Angular's zone so the pending subscription
    // does not prevent ApplicationRef.isStable from emitting true.
    // This mirrors the pattern used in B2bUnitSelectionEffects.openDialogWhenReady().
    // Without this, Cypress cy.wait() calls time out because the zone never
    // stabilises while these requests are in-flight.
    this.ngZone.runOutsideAngular(() => {
      this.userIdService
        .takeUserId(true)
        .pipe(
          take(1),
          switchMap((userId) =>
            forkJoin({
              // Gracefully degrade on error so the component never blocks page rendering.
              orgUnits: this.connector
                .loadOrgUnits(userId)
                .pipe(catchError(() => of([] as B2BUnit[]))),
              defaultUnitName: this.connector
                .loadDefaultOrgUnitName(userId)
                .pipe(catchError(() => of(undefined))),
            })
          )
        )
        .subscribe(({ orgUnits, defaultUnitName }) => {
          this.ngZone.run(() => {
            this.stateService.setOrgUnits(orgUnits);
            this.stateService.setActiveUnit(defaultUnitName ?? null);
          });
        });
    });
  }
}
