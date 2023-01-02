/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UnitAddressDetailsModule } from './details/unit-address-details.module';
import { UnitAddressListModule } from './list/unit-address-list.module';
import { UnitAddressFormModule } from './form/unit-address-form.module';

@NgModule({
  imports: [
    UnitAddressListModule,
    UnitAddressDetailsModule,
    UnitAddressFormModule,
  ],
})
export class UnitAddressModule {}
