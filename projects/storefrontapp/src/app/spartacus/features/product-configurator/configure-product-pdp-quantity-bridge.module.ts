/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { ConfigureProductPdpQuantityBridgeComponent } from './configure-product-pdp-quantity-bridge.component';

@NgModule({
  imports: [
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConfigureProductComponent: {
          component: ConfigureProductPdpQuantityBridgeComponent,
        },
      },
    }),
    ConfigureProductPdpQuantityBridgeComponent,
  ],
})
export class ConfigureProductPdpQuantityBridgeModule {}
