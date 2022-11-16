/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SERVER_ERROR_COLLECTOR } from './server-error.collector';
import { ServerErrorInterceptor } from './server-error.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: SERVER_ERROR_COLLECTOR,
      useExisting: ServerErrorInterceptor,
      multi: true,
    },
  ],
})
export class ServerErrorHandlingModule {}
