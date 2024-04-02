/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultImportExportConfig } from './config/default-import-export-config';

@NgModule({})
export class ImportExportCoreModule {
  static forRoot(): ModuleWithProviders<ImportExportCoreModule> {
    return {
      ngModule: ImportExportCoreModule,
      providers: [provideDefaultConfig(defaultImportExportConfig)],
    };
  }
}
