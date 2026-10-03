/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';
import { FooterVersionModule } from './version/footer-version.module';

@NgModule({
  imports: [
    BaseStorefrontModule,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    FooterVersionModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModule {}
