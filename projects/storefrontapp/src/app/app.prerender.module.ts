/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { providePrerendering } from '@spartacus/setup/prerender';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppServerModule as OriginalAppServerModule } from './app.server.module';

@NgModule({
  imports: [OriginalAppServerModule],
  providers: [
    ...providePrerendering({
      requestOrigin:
        process.env['PRERENDER_DOMAIN'] ??
        `http://localhost:${process.env['PORT'] || 4200}`,
    }),
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
})
// NOTE: DO NOT RENAME! ngUniversal expects this module to be named and exported as exactly `AppServerModule`.
export class AppServerModule {}
