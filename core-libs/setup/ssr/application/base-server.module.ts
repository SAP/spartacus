/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerErrorHandlingModule } from './error-handling/server-error-handling.module';
import { ServerResponseModule } from './server-response/server-response.module';

@NgModule({
  imports: [ServerErrorHandlingModule, ServerResponseModule],
})
export class BaseServerModule {}
