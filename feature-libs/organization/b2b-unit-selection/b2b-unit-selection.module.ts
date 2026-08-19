/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { B2bUnitSelectionCoreModule } from './core/b2b-unit-selection-core.module';
import { B2bUnitSelectionOccModule } from './occ/b2b-unit-selection-occ.module';
import { B2bUnitSelectionComponentsModule } from './components/b2b-unit-selection-components.module';

@NgModule({
  imports: [
    B2bUnitSelectionCoreModule,
    B2bUnitSelectionOccModule,
    B2bUnitSelectionComponentsModule,
  ],
})
export class B2bUnitSelectionModule {}
