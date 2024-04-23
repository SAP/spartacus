/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOppsConfig } from './config';
import { OppsCouponCodesModule, OppsLoginRequiredModule } from './public_api';


@NgModule({
  imports:[OppsCouponCodesModule, OppsLoginRequiredModule],
  providers: [provideDefaultConfig(defaultOppsConfig)],
})
export class OppsRootModule {}
