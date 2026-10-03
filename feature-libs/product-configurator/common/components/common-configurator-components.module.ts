/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultCommonConfiguratorUISettingsConfig } from './config/default-common-configurator-ui-settings.config';
import { ConfiguratorCartEntryInfoModule } from './configurator-cart-entry-info/configurator-cart-entry-info.module';
import { ConfiguratorIssuesNotificationModule } from './configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from './configure-cart-entry/configure-cart-entry.module';
import { ConfigureProductModule } from './configure-product/configure-product.module';
import { ConfiguratorCartEntryBundleInfoModule } from './configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.module';

@NgModule({
  imports: [
    ConfiguratorIssuesNotificationModule,
    ConfiguratorCartEntryInfoModule,
    ConfiguratorCartEntryBundleInfoModule,
    ConfigureCartEntryModule,
    ConfigureProductModule,
  ],
  providers: [provideDefaultConfig(defaultCommonConfiguratorUISettingsConfig)],
})
export class CommonConfiguratorComponentsModule {}
