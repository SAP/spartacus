/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProcessStoreModule } from './store/process-store.module';

@NgModule({
  imports: [ProcessStoreModule],
})
export class ProcessModule {
  static forRoot(): ModuleWithProviders<ProcessModule> {
    return {
      ngModule: ProcessModule,
      providers: [],
    };
  }
}
