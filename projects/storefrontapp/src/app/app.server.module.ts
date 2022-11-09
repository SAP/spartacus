/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideSsrAndPrerendering } from '@spartacus/setup/ssr';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
  providers: [
    ...provideSsrAndPrerendering({
      serverRequestOrigin:
        process.env['SERVER_REQUEST_ORIGIN'] ??
        `http://localhost:${process.env['PORT'] || 4200}`,
    }),
  ],
})
export class AppServerModule {}
