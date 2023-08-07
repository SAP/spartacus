/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { HttpErrorDispatcher } from '../http-error-dispatcher/http-error.dispatcher';

@NgModule()
export class HttpErrorHandlerModule {
  static forRoot(): ModuleWithProviders<HttpErrorHandlerModule> {
    return {
      ngModule: HttpErrorHandlerModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorHandlerInterceptor,
          multi: true,
        },

        // REMOVE THIS BEFORE MERGE
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorDispatcher,
          multi: true,
        },
      ],
    };
  }
}
