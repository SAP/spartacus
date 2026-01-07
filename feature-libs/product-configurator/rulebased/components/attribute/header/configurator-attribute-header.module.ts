/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeCompositionConfig } from '../composition/configurator-attribute-composition.config';
import { ConfiguratorShowOptionsModule } from '../show-options/configurator-show-options.module';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    NgSelectModule,
    ConfiguratorShowMoreModule,
    ConfiguratorShowOptionsModule,
    ConfiguratorAttributeHeaderComponent,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          Header: ConfiguratorAttributeHeaderComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorAttributeHeaderComponent],
})
export class ConfiguratorAttributeHeaderModule {}
