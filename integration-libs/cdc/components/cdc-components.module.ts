/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GigyaRaasModule } from './gigya-raas/gigya-raas.module';
import { SAPCDCScreenSetModule } from './sapcdcscreen-set';

@NgModule({
  declarations: [],
  imports: [CommonModule, GigyaRaasModule,SAPCDCScreenSetModule],
})
export class CdcComponentsModule {}
