/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { B2bUnitSelectionConnector } from './connectors/b2b-unit-selection.connector';
import { B2bUnitSelectionStoreModule } from './store/b2b-unit-selection-store.module';

@NgModule({
  imports: [B2bUnitSelectionStoreModule],
  providers: [B2bUnitSelectionConnector],
})
export class B2bUnitSelectionCoreModule {}
