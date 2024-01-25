/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AdministrationComponentsModule } from '@spartacus/organization/administration/components';
import { AdministrationCoreModule } from '@spartacus/organization/administration/core';
import { AdministrationOccModule } from '@spartacus/organization/administration/occ';

@NgModule({
  imports: [
    AdministrationCoreModule.forRoot(),
    AdministrationOccModule,
    AdministrationComponentsModule,
  ],
})
export class AdministrationModule {}
