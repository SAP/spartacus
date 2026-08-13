/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeContainerComponent } from './configurator-attribute-container.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    ConfiguratorAttributeProductCardModule,
    ConfiguratorAttributeContainerComponent,
  ],
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_container: ConfiguratorAttributeContainerComponent,
        },
      },
    }),
  ],
  exports: [ConfiguratorAttributeContainerComponent],
})
export class ConfiguratorAttributeContainerModule {}
