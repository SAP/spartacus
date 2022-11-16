/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { TRANSFER_SERVER_ERRORS_PROVIDERS } from './error-handling/providers';
import { ServerErrorHandlingModule } from './error-handling/server-error-handling.module';

@NgModule({
  imports: [ServerErrorHandlingModule],
  providers: [...TRANSFER_SERVER_ERRORS_PROVIDERS],
})
export class BaseServerModule {}
