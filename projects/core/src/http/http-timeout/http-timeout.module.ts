/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../config/config-providers';
import { defaultBackendHttpTimeoutConfig } from './default-http-timeout.config';
import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: HttpTimeoutInterceptor,
      multi: true,
    },
    provideDefaultConfig(defaultBackendHttpTimeoutConfig),
  ],
})
export class HttpTimeoutModule {}
