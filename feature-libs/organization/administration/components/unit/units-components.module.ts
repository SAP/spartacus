/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';

import { UnitFormModule } from './form/unit-form.module';
import { UnitAddressModule } from './links/addresses/unit-address.module';





import { unitsCmsConfig, unitsTableConfigFactory } from './units.config';

@NgModule({
  imports: [
    RouterModule,
    UnitFormModule,
    UnitAddressModule,
],
  providers: [
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory),
  ],
})
export class UnitsComponentsModule {}
