/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdpModule } from 'integration-libs/cdp/cdp.module';

@NgModule({
  imports: [CdpModule],
  providers: [],
})
export class CdpFeatureModule {}
