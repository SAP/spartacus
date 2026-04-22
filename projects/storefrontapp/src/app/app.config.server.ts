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
import { provideServerRendering, RenderMode, withRoutes } from '@angular/ssr';
import { TestConfigServerModule } from '@spartacus/setup/ssr';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      // Configure all routes to render server-side
      withRoutes([{ path: '**', renderMode: RenderMode.Server }])
    ),

    importProvidersFrom(AppServerModule),

    importProvidersFrom(
      // DO NOT USE IN CUSTOMERS APPS:
      TestConfigServerModule.forRoot() // Injects config dynamically from e2e tests for SSR.
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
