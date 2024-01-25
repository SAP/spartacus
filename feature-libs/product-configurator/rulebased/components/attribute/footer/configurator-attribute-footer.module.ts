/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          Footer: ConfiguratorAttributeFooterComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeFooterComponent],
  exports: [ConfiguratorAttributeFooterComponent],
})
export class ConfiguratorAttributeFooterModule {}
