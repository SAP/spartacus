/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { IconModule } from '@commerce-storefront-toolset/storefront';
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
  ],
  declarations: [ConfiguratorAttributeFooterComponent],
  exports: [ConfiguratorAttributeFooterComponent],
})
export class ConfiguratorAttributeFooterModule {}
