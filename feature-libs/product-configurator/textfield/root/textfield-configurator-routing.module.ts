/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultTextfieldRoutingConfig } from './default-textfield-routing-config';

/**
 * Provides the default cx routing configuration for the textfield configurator
 */
@NgModule({})
export class TextfieldConfiguratorRoutingModule {
  static forRoot(): ModuleWithProviders<TextfieldConfiguratorRoutingModule> {
    return {
      ngModule: TextfieldConfiguratorRoutingModule,
      providers: [provideDefaultConfig(defaultTextfieldRoutingConfig)],
    };
  }
}
