/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerBackendRequestTimeoutInterceptor } from './server-backend-request-timeout.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ServerBackendRequestTimeoutInterceptor,
      multi: true,
    },
  ],
})
export class ServerBackendRequestTimeoutModule {}
