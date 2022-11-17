/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ExpressServerResponseService } from './express-server-response.service';
import { FallbackServerResponseService } from './fallback-server-response.service';
import { SERVER_RESPONSE_SERVICES } from './server-response.tokens';

@NgModule({
  providers: [
    {
      provide: SERVER_RESPONSE_SERVICES,
      useExisting: ExpressServerResponseService,
      multi: true,
    },
    {
      provide: SERVER_RESPONSE_SERVICES,
      useExisting: FallbackServerResponseService,
      multi: true,
    },
  ],
})
export class ServerResponseModule {}
