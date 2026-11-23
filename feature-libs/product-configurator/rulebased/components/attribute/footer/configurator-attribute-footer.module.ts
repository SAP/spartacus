/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    ConfiguratorAttributeFooterComponent,
  ],
  providers: [
    provideDefaultConfig({
      productConfigurator: {
        assignment: {
          Footer: ConfiguratorAttributeFooterComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorAttributeFooterComponent],
})
export class ConfiguratorAttributeFooterModule {}
