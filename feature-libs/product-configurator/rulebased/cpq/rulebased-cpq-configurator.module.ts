/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CpqConfiguratorCommonModule } from './common/cpq-configurator-common.module';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';

/**
 * Exposes the CPQ flavor of rulebase configurator
 */
@NgModule({
  imports: [CpqConfiguratorCommonModule, CpqConfiguratorOccModule],
})
export class RulebasedCpqConfiguratorModule {}
