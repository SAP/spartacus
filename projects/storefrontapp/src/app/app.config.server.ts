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

// ── Approach (c): Angular-native ─────────────────────────────────────────────
// SPIKE: Angular-native base-site detection — DISABLED (active variant is (b)).
// Registers AiSeoBaseSiteService as an APP_INITIALIZER that waits for
// SiteContextConfigInitializer to resolve context.baseSite, then exposes it
// via getBaseSiteId(). Angular routes for /robots.txt, /llms.txt etc. inject
// AiSeoBaseSiteService to serve per-site content.
// Re-enable both the imports and the providers below to test approach (c).
// import { provideAiSeoBaseSiteDetection } from '../../../../core-libs/setup/ssr/site-context/angular-native-base-site-service';
// import { provideLlmsTxtRoute } from './spike-ai-seo/llms-txt.component';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    // ── Approach (c) — disabled; uncomment together with the imports above ──
    // provideAiSeoBaseSiteDetection(),
    // provideLlmsTxtRoute(),

    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
