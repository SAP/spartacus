/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServerErrorHandlingModule } from './error-handling/server-error-handling.module';

// SPIKE TODO: move everything related to this module to a different package than /recipes
@NgModule({
  imports: [ServerErrorHandlingModule],
})
export class BaseServerModule {
  static forRoot(): ModuleWithProviders<BaseServerModule> {
    return {
      ngModule: BaseServerModule,
    };
  }
}
