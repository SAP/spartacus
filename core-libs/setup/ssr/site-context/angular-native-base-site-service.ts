/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * ── Approach (c): Angular-native ── baseSite detection inside the Angular SSR pipeline.
 *
 * Architecture:
 *   provideAiSeoBaseSiteDetection() → registered in app.config.server.ts
 *     └─ AiSeoBaseSiteService (APP_INITIALIZER)
 *          ├─ waits for ConfigInitializerService.getStable('context')
 *          │   (SiteContextConfigInitializer already makes the OCC call — no duplication)
 *          └─ reads context.baseSite[0] → stores in service state
 *
 * Key design decisions:
 * - NO second OCC call: reuses result of the existing SiteContextConfigInitializer
 * - NO coupling to SiteContextConfigInitializer directly: reads through
 *   ConfigInitializerService.getStable() + SiteContextConfig (both stable public API)
 * - Extensible: AI_SEO_BASE_SITE_RESOLVER_FN token allows swapping the detection logic
 *   without changing the service (dependency inversion hook for the future)
 *
 * Non-render handlers (/robots.txt, /llms.txt etc.):
 *   In approach (c) these are Angular routes, NOT Express routes.
 *   Express catch-all passes them to Angular SSR. Components read baseSiteId from
 *   AiSeoBaseSiteService and set the response Content-Type accordingly.
 */

import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  inject,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ConfigInitializerService } from '@spartacus/core';
import { SiteContextConfig } from '@spartacus/core';

/**
 * Extensibility hook: provide a custom function to resolve baseSiteId.
 * Default: reads from ConfigInitializerService after 'context' scope is stable.
 * Override to use a completely independent OCC call, env var, or any other source.
 */
export const AI_SEO_BASE_SITE_RESOLVER_FN = new InjectionToken<
  () => Promise<string | null>
>('AI_SEO_BASE_SITE_RESOLVER_FN');

@Injectable()
export class AiSeoBaseSiteService {
  private baseSiteId: string | null = null;

  private readonly resolverFn = inject(AI_SEO_BASE_SITE_RESOLVER_FN);

  async initialize(): Promise<void> {
    try {
      this.baseSiteId = await this.resolverFn();
      console.log(`[approach-c] Resolved baseSiteId: ${this.baseSiteId ?? '(null)'}`);
    } catch (err) {
      console.error('[approach-c] Failed to resolve baseSiteId:', err);
    }
  }

  getBaseSiteId(): string | null {
    return this.baseSiteId;
  }
}

/**
 * Default resolver: waits for SiteContextConfigInitializer to finish
 * (via ConfigInitializerService.getStable('context')) and reads the result.
 * No additional OCC call — reuses the one already made by Spartacus.
 */
function defaultBaseSiteResolverFactory(
  configInitializerService: ConfigInitializerService,
  siteContextConfig: SiteContextConfig
): () => Promise<string | null> {
  return async () => {
    await lastValueFrom(configInitializerService.getStable('context'));
    const baseSiteId =
      (siteContextConfig.context as Record<string, string[]>)?.['baseSite']?.[0] ?? null;
    return baseSiteId;
  };
}

/**
 * Registers the Angular-native base-site detection feature.
 *
 * Add to app.config.server.ts providers array:
 *   provideAiSeoBaseSiteDetection()
 *
 * To override the detection logic (e.g. for an independent OCC call):
 *   provideAiSeoBaseSiteDetection({
 *     resolverFn: () => myCustomResolver()
 *   })
 */
export function provideAiSeoBaseSiteDetection(options?: {
  /**
   * Custom resolver function. When provided, replaces the default
   * ConfigInitializerService-based resolution entirely.
   */
  resolverFn?: () => Promise<string | null>;
}): EnvironmentProviders {
  return makeEnvironmentProviders([
    AiSeoBaseSiteService,
    options?.resolverFn
      ? { provide: AI_SEO_BASE_SITE_RESOLVER_FN, useValue: options.resolverFn }
      : {
          provide: AI_SEO_BASE_SITE_RESOLVER_FN,
          useFactory: defaultBaseSiteResolverFactory,
          deps: [ConfigInitializerService, SiteContextConfig],
        },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AiSeoBaseSiteService) => () => service.initialize(),
      deps: [AiSeoBaseSiteService],
      multi: true,
    },
  ]);
}
