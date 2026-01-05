/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultLcpCmsComponentsConfig } from './config/default-lcp-cms-components.config';

@NgModule({})
export class CmsLcpModule {
  static forRoot() {
    return {
      ngModule: CmsLcpModule,
      providers: [provideDefaultConfig(defaultLcpCmsComponentsConfig)],
    };
  }
}
