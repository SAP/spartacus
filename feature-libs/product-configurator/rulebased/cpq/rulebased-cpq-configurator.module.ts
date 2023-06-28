/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CpqConfiguratorCommonModule } from './common/cpq-configurator-common.modules';
import { defaultConfiguratorCpqConfig } from './config/default-configurator-cpq.config';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';

/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
@NgModule({
  imports: [
    CpqConfiguratorCommonModule,
    CpqConfiguratorOccModule,
    CpqConfiguratorRestModule,
  ],
  providers: [provideDefaultConfig(defaultConfiguratorCpqConfig)],
})
export class RulebasedCpqConfiguratorModule {}
