/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    NgSelectModule,
    ConfiguratorShowMoreModule,
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
  declarations: [ConfiguratorAttributeHeaderComponent],
  exports: [ConfiguratorAttributeHeaderComponent],
})
export class ConfiguratorAttributeHeaderModule {}
