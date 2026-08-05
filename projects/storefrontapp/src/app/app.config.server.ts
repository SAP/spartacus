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
// SPIKE: Angular-native base-site detection — ENABLED for issue 04 POC.
// AiSeoBaseSiteService (APP_INITIALIZER) waits for SiteContextConfigInitializer
// to resolve context.baseSite, then exposes it via getBaseSiteId(). The
// /llms.txt Angular route reads it. provideLlmsTxtBeforeSerialized() adds the
// honest BEFORE_APP_SERIALIZED transport probe (see llms-txt.component.ts).
import { provideAiSeoBaseSiteDetection } from '../../../../core-libs/setup/ssr/site-context/angular-native-base-site-service';
import {
  provideLlmsTxtRoute,
  provideLlmsTxtBeforeSerialized,
} from './spike-ai-seo/llms-txt.component';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    // ── Approach (c) — ENABLED for issue 04 POC ──
    provideAiSeoBaseSiteDetection(),
    provideLlmsTxtRoute(),
    provideLlmsTxtBeforeSerialized(),

    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
