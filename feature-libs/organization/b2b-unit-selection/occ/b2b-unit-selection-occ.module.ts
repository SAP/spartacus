/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { B2bUnitSelectionAdapter } from '../core/connectors/b2b-unit-selection.adapter';
import { OccB2bUnitSelectionAdapter } from './adapters/occ-b2b-unit-selection.adapter';
import { defaultOccB2bUnitSelectionConfig } from './config/default-occ-b2b-unit-selection-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccB2bUnitSelectionConfig),
    {
      provide: B2bUnitSelectionAdapter,
      useClass: OccB2bUnitSelectionAdapter,
    },
  ],
})
export class B2bUnitSelectionOccModule {}
