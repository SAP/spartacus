/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { defaultConfiguratorUISettingsConfig } from '../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

@NgModule({
    exports: [ConfiguratorAttributeQuantityComponent],
    imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule, ConfiguratorAttributeQuantityComponent],
    providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
})
export class ConfiguratorAttributeQuantityModule {}
