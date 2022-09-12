/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfiguratorShowMoreComponent],
  exports: [ConfiguratorShowMoreComponent],
})
export class ConfiguratorShowMoreModule {}
