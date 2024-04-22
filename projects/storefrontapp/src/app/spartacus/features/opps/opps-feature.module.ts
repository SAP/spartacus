/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OppsCouponCodesModule } from '@spartacus/opps';
import { OppsLoginRequiredModule } from 'integration-libs/opps/login-required/opps-login-required.module';

@NgModule({
  imports: [OppsCouponCodesModule, OppsLoginRequiredModule],
})
export class OppsFeatureModule {}
