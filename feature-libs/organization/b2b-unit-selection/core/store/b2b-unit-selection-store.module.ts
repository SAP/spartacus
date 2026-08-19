/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { B2bUnitSelectionEffects } from './effects/b2b-unit-selection.effects';

@NgModule({
  imports: [EffectsModule.forFeature([B2bUnitSelectionEffects])],
})
export class B2bUnitSelectionStoreModule {}
