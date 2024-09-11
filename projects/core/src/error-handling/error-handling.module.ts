/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import { EffectsErrorHandlerModule } from './effects-error-handler';
import { HttpErrorHandlerModule } from './http-error-handler';
import { provideMultiErrorHandler } from './multi-error-handler/provide-multi-error-handler';

@NgModule({
  imports: [
    EffectsErrorHandlerModule.forRoot(),
    HttpErrorHandlerModule.forRoot(),
  ],
})
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        provideMultiErrorHandler(),
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
      ],
    };
  }
}
