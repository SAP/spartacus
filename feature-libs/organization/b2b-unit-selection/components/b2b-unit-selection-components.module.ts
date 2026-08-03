/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog/b2b-unit-selection-dialog.component';
import { B2bUnitSelectorComponent } from './b2b-unit-selector/b2b-unit-selector.component';
import { defaultB2bUnitSelectionLayoutConfig } from './default-b2b-unit-selection-layout.config';

@NgModule({
  imports: [B2bUnitSelectionDialogComponent, B2bUnitSelectorComponent],
  providers: [
    provideDefaultConfig(defaultB2bUnitSelectionLayoutConfig),
    // CMS component mapping is intentionally NOT registered here.
    // It is only registered when the feature is explicitly enabled, via
    // provideB2bUnitSelectorCmsComponent() in the consuming feature module.
    // This prevents Angular from instantiating B2bUnitSelectorComponent in the
    // CMS slot when the feature is disabled, which would otherwise create
    // Zone.js micro-tasks and prevent ApplicationRef.isStable from emitting.
  ],
})
export class B2bUnitSelectionComponentsModule {}
