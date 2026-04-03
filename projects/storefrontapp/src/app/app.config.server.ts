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
import { OccConfig, provideConfig } from '@spartacus/core';
import { TestConfigServerModule } from '@spartacus/setup/ssr';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';
import { provideSitemapFileGenerator } from '@spartacus/setup/sitemaps';

const defaultBaseUrl =
  process.env['SITEMAP_BASE_URL'] || 'http://localhost:4000';

/**
 * OCC backend URL — read from environment variable at runtime.
 * Set this before starting the server or running the sitemap CLI:
 *   OCC_BACKEND_BASE_URL=https://api.example.com node generate-sitemaps.mjs
 */
const occBaseUrl = process.env['OCC_BACKEND_BASE_URL'] || '';

const sitemapBaseUrls: Record<string, string> = {
  'electronics-spa': defaultBaseUrl,
  'electronics-spa-standalone': defaultBaseUrl,
  electronics: defaultBaseUrl,
  'electronics-standalone': defaultBaseUrl,
  'apparel-de': 'http://www.apparel.de:4000',
  'apparel-uk': 'http://www.apparel.uk:4000',
  'apparel-uk-spa': defaultBaseUrl,
  'apparel-uk-standalone': defaultBaseUrl,
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    // Configure OCC backend URL from environment variable.
    // This overrides the meta tag mechanism which may not work
    // reliably in standalone CLI (renderApplication) context.
    ...(occBaseUrl
      ? [provideConfig({ backend: { occ: { baseUrl: occBaseUrl } } } as OccConfig)]
      : []),

    // File-based sitemap generation for standalone CLI usage.
    // Run: node projects/storefrontapp/generate-sitemaps.mjs
    provideSitemapFileGenerator({
      baseUrls: sitemapBaseUrls,
      occBaseUrl: occBaseUrl || undefined,
    }),
    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
