/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideServer } from '@spartacus/setup/ssr';

@NgModule({
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
  ],
})
export class AppServerModule {}
