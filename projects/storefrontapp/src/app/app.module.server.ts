/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideServer } from '@spartacus/setup/ssr';
import { BFF_BASE_URL } from './bff/bff-base-url.token';

@NgModule({
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    // In SSR, relative URLs have no base to resolve against, so BFF calls
    // need an absolute URL. The platform sets BFF_BASE_URL at deploy time;
    // the fallback covers local dev.
    {
      provide: BFF_BASE_URL,
      useValue:
        process.env['BFF_BASE_URL'] ?? 'https://localhost:8482/bff/api',
    },
  ],
})
export class AppServerModule {}
