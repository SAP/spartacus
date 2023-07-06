/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpTimeoutModule } from './http-timeout/http-timeout.module';
import {HttpErrorHandlerModule} from "./http-error-handler/http-error-handler.module";
import {HttpErrorDispatcherModule} from "./http-error-dispatcher/http-error-dispatcher.module";

@NgModule({
  imports: [
    HttpErrorHandlerModule,
    HttpErrorDispatcherModule,
    HttpTimeoutModule,
  ],
})
export class HttpModule {
  static forRoot(): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
    };
  }
}
