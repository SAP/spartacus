/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { BaseServerModule } from '@spartacus/setup/ssr';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // BaseServerModule should be imported as the first, because it provides
    // an interceptor that is meant to collect all errors thrown from all other interceptors.
    BaseServerModule,

    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
})
export class AppServerModule {}
