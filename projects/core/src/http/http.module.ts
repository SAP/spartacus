/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpTimeoutModule } from './http-timeout/http-timeout.module';

@NgModule({
  imports: [HttpTimeoutModule],
})
export class HttpModule {
  static forRoot(): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
    };
  }
}
