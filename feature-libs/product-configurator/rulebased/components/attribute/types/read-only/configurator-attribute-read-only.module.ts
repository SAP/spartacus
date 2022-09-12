/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { KeyboardFocusModule } from '@commerce-storefront-toolset/storefront';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
  ],
  declarations: [ConfiguratorAttributeReadOnlyComponent],
  exports: [ConfiguratorAttributeReadOnlyComponent],
})
export class ConfiguratorAttributeReadOnlyModule {}
