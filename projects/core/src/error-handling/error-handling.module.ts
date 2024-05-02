/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import { EffectsErrorHandlerModule } from './effects-error-handler';
import { provideMultiErrorHandler } from './multi-error-handler';

// maybe this module should contain all error handling related parts, including modules providing breaking changes?
// this module is already part of BaseCoreModule
// verify whether importing HttpErrorHandler module here won't break its behavior.
@NgModule({
  imports: [EffectsErrorHandlerModule.forRoot()],
})
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        provideMultiErrorHandler(), // potentially not breaking change (?)
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
      ],
    };
  }
}
