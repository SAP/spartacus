/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { Logger } from '@spartacus/core';
import {
  ServerLogger,
  provideServer,
  ssrErrorHandlerFactory,
  ssrLoggerFactory,
  ssrLoggerToken,
} from '@spartacus/setup/ssr';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';

@Injectable({
  providedIn: 'root',
})
export class SomeErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error(error);
  }
}

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
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    {
      provide: Logger,
      useClass: ServerLogger,
    },
    {
      provide: ErrorHandler,
      useFactory: ssrErrorHandlerFactory,
    },
    // for pre-rendering purposes - "there is no Express" fallback
    {
      provide: ssrLoggerToken,
      useFactory: ssrLoggerFactory,
    },
  ],
})
export class AppServerModule {}
