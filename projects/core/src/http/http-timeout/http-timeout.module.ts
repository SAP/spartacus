/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../config/config-providers';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: HttpTimeoutInterceptor,
      multi: true,
    },
    provideDefaultConfig({
      backend: {
        timeout: {
          // SPIKE TODO [BREAKING CHANGE]: uncomment it only in the next major (v6.0?):
          server: 6_000, //10_000,
        },
      },
    }),
  ],
})
export class HttpTimeoutModule {}
