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
import { provideAiSeoBaseSiteDetection } from '../../../../core-libs/setup/ssr/site-context/angular-native-base-site-service';
import { provideLlmsTxtRoute } from './spike-ai-seo/llms-txt.component';

// SPIKE — approach (c): Angular-native base-site detection
// AiSeoBaseSiteService registers as APP_INITIALIZER, waits for
// SiteContextConfigInitializer to resolve context.baseSite, then exposes it
// via getBaseSiteId(). Angular routes for /llms.txt etc. inject the service
// to serve per-site content.
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideAiSeoBaseSiteDetection(),
    provideLlmsTxtRoute(),
    importProvidersFrom(AppServerModule),
    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
