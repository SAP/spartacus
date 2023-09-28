/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import { ERROR_INTERCEPTORS } from './error-interceptors/error-interceptor';
import { LoggerErrorInterceptor } from './error-interceptors/logger-error.interceptor';

@NgModule()
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ERROR_INTERCEPTORS,
          useClass: LoggerErrorInterceptor,
          multi: true,
        },
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
      ],
    };
  }
}
