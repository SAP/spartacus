/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { computed, Directive, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { B2BUnit, UserIdService } from '@spartacus/core';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { B2bUnitSelectionConnector } from '../../core/connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../core/services/b2b-unit-selector-state.service';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';
import { B2bUnitSelectionConfig } from '../../root/config/b2b-unit-selection.config';

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
  private config = inject(B2bUnitSelectionConfig);

  /** All assignable B2B units for the current user. */
  readonly items = toSignal(this.stateService.orgUnits$, {
    initialValue: [] as B2BUnit[],
  });

  /** Currently active (default) unit name. */
  readonly activeUnitName = toSignal(this.stateService.activeUnitName$, {
    initialValue: null as string | null,
  });

  /** True when the user has more than one unit — selector is interactive. */
  readonly hasMultipleUnits = computed(() => this.items().length > 1);

  /** True when the user has at least one unit — selector is rendered (disabled for single unit). */
  readonly hasAnyUnit = computed(() => this.items().length > 0);

  ngOnInit(): void {
    if (!this.config.b2bUnitSelection?.enabled) {
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
            unitUid: unitName,
            redirectToHome: true,
          })
        );
      });
  }

  private loadAndPopulateState(): void {
    this.userIdService
      .takeUserId(true)
      .pipe(
        take(1),
        switchMap((userId) =>
          forkJoin({
            orgUnits: this.connector.loadOrgUnits(userId),
            defaultUnitUid: this.connector
              .loadDefaultOrgUnitUid(userId)
              .pipe(catchError(() => of(undefined))),
          })
        )
      )
      .subscribe(({ orgUnits, defaultUnitUid }) => {
        this.stateService.setOrgUnits(orgUnits);
        this.stateService.setActiveUnit(defaultUnitUid ?? null);
      });
  }
}
