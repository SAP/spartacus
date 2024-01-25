/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UnitOrderComponentsModule } from '@spartacus/organization/unit-order/components';
import { UnitOrderCoreModule } from '@spartacus/organization/unit-order/core';
import { UnitOrderOccModule } from '@spartacus/organization/unit-order/occ';

@NgModule({
  imports: [
    UnitOrderCoreModule.forRoot(),
    UnitOrderOccModule,
    UnitOrderComponentsModule,
  ],
})
export class UnitOrderModule {}
