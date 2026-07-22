/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog/b2b-unit-selection-dialog.component';
import { B2bUnitSelectorComponent } from './b2b-unit-selector/b2b-unit-selector.component';
import { B2bUnitSelectorOutletComponent } from './b2b-unit-selector-outlet/b2b-unit-selector-outlet.component';
import { defaultB2bUnitSelectionLayoutConfig } from './default-b2b-unit-selection-layout.config';

@NgModule({
  imports: [
    B2bUnitSelectionDialogComponent,
    B2bUnitSelectorComponent,
    B2bUnitSelectorOutletComponent,
  ],
  exports: [B2bUnitSelectorOutletComponent],
  providers: [provideDefaultConfig(defaultB2bUnitSelectionLayoutConfig)],
})
export class B2bUnitSelectionComponentsModule {}
