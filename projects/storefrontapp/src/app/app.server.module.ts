/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServer } from '@spartacus/setup/ssr';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';
import {
  throwOups,
  writeStateToFile,
} from './custom/handlers/server-error-handlers';
import { provideErrorHandlers } from './custom/providers/provide-error-handlers';

@NgModule({
  imports: [
    // InterceptorModule,
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    provideErrorHandlers([writeStateToFile, throwOups]),
  ],
})
export class AppServerModule {}
