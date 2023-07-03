/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorRouterListener } from './configurator-router.listener';

@NgModule({})
export class ConfiguratorRouterModule {
  constructor(_configuratorRouterListener: ConfiguratorRouterListener) {
    // Intentional empty constructor
  }
}
