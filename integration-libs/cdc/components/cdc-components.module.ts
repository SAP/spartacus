/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GigyaRaasModule } from './gigya-raas/gigya-raas.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GigyaRaasModule],
})
export class CdcComponentsModule {}
