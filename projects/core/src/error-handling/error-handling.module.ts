/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import {EffectsModule} from "@ngrx/effects";
import {CxErrorHandlerEffect} from "./cx-error-handler.effect";

@NgModule({
  imports: [
    EffectsModule.forFeature([CxErrorHandlerEffect])]
})
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
      ],
    };
  }
}
