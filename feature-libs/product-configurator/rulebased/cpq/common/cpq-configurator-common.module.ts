/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpqConfiguratorNormalizer } from './converters/cpq-configurator-normalizer';
import { CpqConfiguratorOverviewNormalizer } from './converters/cpq-configurator-overview-normalizer';
import { CpqConfiguratorSerializer } from './converters/cpq-configurator-serializer';
import { CpqConfiguratorValueSerializer } from './converters/cpq-configurator-value-serializer';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from './converters/cpq-configurator.converters';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: CPQ_CONFIGURATOR_NORMALIZER,
      useClass: CpqConfiguratorNormalizer,
      multi: true,
    },
    {
      provide: CPQ_CONFIGURATOR_SERIALIZER,
      useClass: CpqConfiguratorSerializer,
      multi: true,
    },
    {
      provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
      useClass: CpqConfiguratorValueSerializer,
      multi: true,
    },
    {
      provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
      useClass: CpqConfiguratorOverviewNormalizer,
      multi: true,
    },
  ],
})
export class CpqConfiguratorCommonModule {}
