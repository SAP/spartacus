/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorPriceComponent } from './configurator-price.component';
import { I18nModule } from '@spartacus/core';

@NgModule({
    exports: [ConfiguratorPriceComponent],
    imports: [CommonModule, I18nModule, ConfiguratorPriceComponent],
})
export class ConfiguratorPriceModule {}
