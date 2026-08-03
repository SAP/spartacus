/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { B2bUnitSelectionConnector } from './connectors/b2b-unit-selection.connector';
import { B2bUnitSelectionService } from './services/b2b-unit-selection.service';

@NgModule({
  providers: [
    B2bUnitSelectionConnector,
    // Eagerly initialise the service so it subscribes to LoginEvent/LogoutEvent
    // as soon as the feature module is loaded.
    B2bUnitSelectionService,
  ],
})
export class B2bUnitSelectionCoreModule {
  // Inject here to trigger instantiation (providedIn: 'root' is lazy by default
  // inside feature modules unless explicitly constructed).
  constructor(_service: B2bUnitSelectionService) {}
}
