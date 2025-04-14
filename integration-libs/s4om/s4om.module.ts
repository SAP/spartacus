/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4omComponentsModule } from './components/s4om-components.module';
import { S4omCoreModule } from './core/s4om-core.module';
import { S4omOccModule } from './occ/s4om-occ.module';

@NgModule({
  imports: [S4omComponentsModule, S4omCoreModule, S4omOccModule],
})
export class S4omModule {}
