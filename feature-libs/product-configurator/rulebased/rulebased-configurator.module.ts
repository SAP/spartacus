/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RulebasedConfiguratorComponentsModule } from './components/rulebased-configurator-components.module';
import { RulebasedConfiguratorCoreModule } from './core/rulebased-configurator-core.module';
import { VariantConfiguratorOccModule } from './occ/variant/variant-configurator-occ.module';

@NgModule({
  imports: [
    VariantConfiguratorOccModule,
    RulebasedConfiguratorCoreModule,
    RulebasedConfiguratorComponentsModule,
  ],
})
export class RulebasedConfiguratorModule {}
