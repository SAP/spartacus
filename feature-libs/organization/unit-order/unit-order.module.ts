/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UnitOrderComponentsModule } from './components/unit-order-components.module';
import { UnitOrderCoreModule } from './core/unit-order-core.module';
import { UnitOrderOccModule } from './occ';

@NgModule({
  imports: [
    UnitOrderCoreModule.forRoot(),
    UnitOrderOccModule,
    UnitOrderComponentsModule,
  ],
})
export class UnitOrderModule {}
