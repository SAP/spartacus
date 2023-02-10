/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdpRootModule } from 'integration-libs/cdp/cdp-root.module';
// import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
// import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdpRootModule],
  // providers: [
  //   provideConfig(<CdpConfig>{
  //     component: [
  //       {
  //         LoginComponent: CdpLoginComponent
  //       }
  //     ]
  //   })
  // ],
})
export class CdpFeatureModule {}
