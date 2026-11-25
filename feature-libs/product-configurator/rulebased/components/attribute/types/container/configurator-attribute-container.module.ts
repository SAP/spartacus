/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeContainerComponent } from './configurator-attribute-container.component';

@NgModule({
  imports: [ConfiguratorAttributeContainerComponent],
  providers: [
    provideDefaultConfig({
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
