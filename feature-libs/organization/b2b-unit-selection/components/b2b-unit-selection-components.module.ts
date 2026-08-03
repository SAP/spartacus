/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog/b2b-unit-selection-dialog.component';
import { B2bUnitSelectorComponent } from './b2b-unit-selector/b2b-unit-selector.component';
import { defaultB2bUnitSelectionLayoutConfig } from './default-b2b-unit-selection-layout.config';

@NgModule({
  imports: [B2bUnitSelectionDialogComponent, B2bUnitSelectorComponent],
  providers: [
    provideDefaultConfig(defaultB2bUnitSelectionLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        B2bUnitSelectorComponent: {
          component: B2bUnitSelectorComponent,
        },
      },
    }),
  ],
})
export class B2bUnitSelectionComponentsModule {}
