/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { PROPAGATE_ERROR_TO_SERVER, provideServer } from '@spartacus/setup/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    ...provideServer({
      // SPIKE UNDO - added temporarily for DX: simpler prerendering configuration and example deployment
      serverRequestOrigin: process.env['MIKRUS_SITE']
        ? `https://sparta${process.env['MIKRUS_SITE']}-mikrus.platis.dev`
        : process.env['SERVER_REQUEST_ORIGIN'],
    }),
    // SPIKE UNDO - added temporarily for DX: to run Prerendering without errors (fixing locally a known bug Prerendering in Spartacus)
    {
      provide: PROPAGATE_ERROR_TO_SERVER,
      useFactory: () => () => {},
    },
  ],
})
export class AppServerModule {}
