/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import { effectErrorHandlerProviders } from './effects-error-handler/effects-error-handler-provider';

@NgModule()
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
        ...effectErrorHandlerProviders,
      ],
    };
  }
}
