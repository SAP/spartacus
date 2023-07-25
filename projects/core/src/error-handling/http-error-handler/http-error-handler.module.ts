/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';

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
      ],
    };
  }
}
