/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { FooterVersionModule } from './footer/footer-version.module';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';

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
