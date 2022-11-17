/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { SERVER_ERROR_COLLECTORS } from './server-error.collector';
import { ServerHttpErrorInterceptor } from './server-http-error.interceptor';
import { TransferServerErrors } from './transfer-server-errors';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ServerHttpErrorInterceptor,
      multi: true,
    },
    {
      provide: SERVER_ERROR_COLLECTORS,
      useExisting: ServerHttpErrorInterceptor,
      multi: true,
    },
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: () => {
        const transferServerErrors = inject(TransferServerErrors);
        return () => transferServerErrors.transferErrors();
      },
      multi: true,
    },
  ],
})
export class ServerErrorHandlingModule {}
