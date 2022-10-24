/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerBackendRequestTimeoutModule } from './backend-request-timeout/server-backend-request-timeout.module';
import { ServerErrorSerializerModule } from './server-error/server-error.module';

// SPIKE TODO: move everything related to this module to a different package than /recipes

@NgModule({
  imports: [ServerErrorSerializerModule, ServerBackendRequestTimeoutModule],
})
export class SpartacusServerModule {}
