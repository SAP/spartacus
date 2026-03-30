/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApplicationConfig,
  importProvidersFrom,
  mergeApplicationConfig,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TestConfigServerModule } from '@spartacus/setup/ssr';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';
import { provideSitemapGenerator } from '@spartacus/setup/sitemaps';

const defaultBaseUrl =
  process.env['SITEMAP_BASE_URL'] || 'http://localhost:4000';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideSitemapGenerator({
      baseUrls: {
        'electronics-spa': defaultBaseUrl,
        'electronics-spa-standalone': defaultBaseUrl,
        electronics: defaultBaseUrl,
        'electronics-standalone': defaultBaseUrl,
        'apparel-de': 'http://www.apparel.de:4000',
        'apparel-uk': 'http://www.apparel.uk:4000',
        'apparel-uk-spa': defaultBaseUrl,
        'apparel-uk-standalone': defaultBaseUrl,
      },
    }),
    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
