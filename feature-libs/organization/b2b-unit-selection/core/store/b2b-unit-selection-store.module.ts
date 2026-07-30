/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { B2bUnitSelectionEffects } from './effects/b2b-unit-selection.effects';

/**
 * Registers NgRx effects for the B2B unit selection feature.
 *
 * **Why zone stability matters:**
 * NgRx wraps every registered effect observable with `materialize()` and
 * merges them inside `EffectsRunner`, which lives for the entire application
 * lifetime inside Angular's zone.  Even when effects return `EMPTY` immediately,
 * the `merge()` + `exhaustMap()` subscription chain in `EffectSources.toActions()`
 * keeps a live observable subscription in the Angular zone indefinitely.
 * This prevents `ApplicationRef.isStable` from emitting `true`, causing
 * Cypress `cy.wait()` to time out with "No request ever occurred".
 *
 * **Solution: `OnRunEffects` hook.**
 * `B2bUnitSelectionEffects` implements the NgRx `OnRunEffects` interface.
 * When the feature is disabled, `ngrxOnRunEffects()` returns `EMPTY`, which
 * NgRx passes directly to `exhaustMap` — completing synchronously and creating
 * **no** Zone.js pending task so the zone can stabilise normally.
 */
@NgModule({
  imports: [EffectsModule.forFeature([B2bUnitSelectionEffects])],
})
export class B2bUnitSelectionStoreModule {}
