/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from '../../composition/configurator-attribute-composition.config';
import { ConfiguratorAttributeSingleSelectionImageComponent } from '../single-selection-image/configurator-attribute-single-selection-image.component';

@NgModule({
  providers: [
    provideDefaultConfig(<ConfiguratorAttributeCompositionConfig>{
      productConfigurator: {
        assignment: {
          AttributeType_read_only_single_selection_image:
            ConfiguratorAttributeSingleSelectionImageComponent,
        },
      },
    }),
  ],
})
export class ConfiguratorAttributeReadOnlySingleSelectionImageModule {}
