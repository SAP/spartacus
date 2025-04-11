/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4omComponentsModule } from './components';
import { S4omOrderCoreModule } from './core';
import { S4omOrderOccModule } from './occ';

@NgModule({
  declarations: [],
  imports: [S4omComponentsModule, S4omOrderCoreModule, S4omOrderOccModule],
})
export class S4omModule {
}
