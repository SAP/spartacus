/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { defaultCpqConfiguratorEndpointConfig } from './default-cpq-configurator-endpoint.config';

@NgModule({
  imports: [CommonModule],

  providers: [
    {
      provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
      useClass: CpqConfiguratorRestAdapter,
      multi: true,
    },
    provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
  ],
})
export class CpqConfiguratorRestModule {}
