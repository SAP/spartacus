/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { CommonConfiguratorOccModule } from './occ/common-configurator-occ.module';

@NgModule({
  imports: [CommonConfiguratorOccModule, CommonConfiguratorComponentsModule],
})
export class CommonConfiguratorModule {}
