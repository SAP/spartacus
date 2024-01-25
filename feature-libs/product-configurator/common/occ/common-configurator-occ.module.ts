/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccConfiguratorProductConfig } from './default-occ-configurator-product-config';

@NgModule({
  providers: [provideDefaultConfig(defaultOccConfiguratorProductConfig)],
})
export class CommonConfiguratorOccModule {}
