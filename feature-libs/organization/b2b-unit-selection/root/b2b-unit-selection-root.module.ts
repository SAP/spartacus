/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultB2bUnitSelectionConfig } from './config/default-b2b-unit-selection-config';
// Side-effect import: ensures the LAUNCH_CALLER extension is registered at application startup.
import './model/augmented-core.model';

@NgModule({
  providers: [provideDefaultConfig(defaultB2bUnitSelectionConfig)],
})
export class B2bUnitSelectionRootModule {}
