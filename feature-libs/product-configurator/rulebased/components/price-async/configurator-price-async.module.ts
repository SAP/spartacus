/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorPriceAsyncComponent } from './configurator-price-async.component';

import { I18nModule } from '@spartacus/core';

@NgModule({
  declarations: [ConfiguratorPriceAsyncComponent],
  exports: [ConfiguratorPriceAsyncComponent],
  imports: [CommonModule, I18nModule],
})
export class ConfiguratorPriceAsyncModule {}
