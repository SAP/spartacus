/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';


import { UnitAddressFormModule } from './form/unit-address-form.module';

@NgModule({
  imports: [
    UnitAddressFormModule,
],
})
export class UnitAddressModule {}
