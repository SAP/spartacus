/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { BackendTimeoutModule } from './backend-timeout/backend-timeout.module';

@NgModule({
  imports: [BackendTimeoutModule],
})
export class HttpModule {
  static forRoot(): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
  }
}
