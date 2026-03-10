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

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideSitemapGenerator({
      baseUrl: process.env['SITEMAP_BASE_URL'] || 'http://localhost:4000',
      occBaseUrl: process.env['SITEMAP_OCC_URL'] || 'https://40.76.109.9:9002',
    }),
    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
