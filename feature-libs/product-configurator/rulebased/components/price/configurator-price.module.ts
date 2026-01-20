/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorPriceComponent } from './configurator-price.component';

@NgModule({
  exports: [ConfiguratorPriceComponent],
  imports: [CommonModule, I18nModule, ConfiguratorPriceComponent],
})
export class ConfiguratorPriceModule {}
