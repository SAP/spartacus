/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServer } from '@spartacus/setup/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    ...provideServer({
      // SPIKE UNDO - added temporarily for DX: simpler prerendering configuration
      serverRequestOrigin: 'example.com', //process.env['SERVER_REQUEST_ORIGIN'],
    }),
  ],
})
export class AppServerModule {}
