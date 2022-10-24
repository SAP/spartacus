/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppServerModule } from './app.server.module';

@NgModule({
  imports: [AppServerModule],
  providers: [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useValue: 'https://xxx',
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: () =>
        inject(SERVER_REQUEST_ORIGIN) + inject(INITIAL_CONFIG).url,
    },
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
})
export class AppPrerenderModule {}
