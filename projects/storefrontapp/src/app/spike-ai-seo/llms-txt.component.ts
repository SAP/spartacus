/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ── Approach (c): Angular-native ─────────────────────────────────────────────
// SPIKE — not production code.
//
// Angular route component that serves llms.txt inside the Angular SSR pipeline.
// This is the (c) counterpart to the Express handler used by approaches (a)/(b):
// instead of an Express route resolving baseSiteId before Angular, the request
// falls through the Express catch-all into Angular render, matches this route,
// and reads baseSiteId from AiSeoBaseSiteService (already resolved by the
// SiteContextConfigInitializer via APP_INITIALIZER — no extra OCC call).
//
// Known trade-off (see ADR Option 3 findings): the CommonEngine renders the
// full HTML shell around this template, so the response body is NOT clean
// text/plain even though we set the Content-Type header via the RESPONSE token.
// Producing a pure text/plain body from an Angular route is awkward — this is a
// documented weakness of approach (c) for non-render handlers, not fixed here.

import {
  APP_INITIALIZER,
  Component,
  EnvironmentProviders,
  Injector,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { Router } from '@angular/router';
import { RESPONSE } from '@spartacus/setup/ssr';
import { AiSeoBaseSiteService } from '../../../../../core-libs/setup/ssr/site-context/angular-native-base-site-service';

@Component({
  selector: 'cx-spike-llms-txt',
  standalone: true,
  template: '{{ content }}',
})
export class LlmsTxtComponent {
  private readonly baseSiteService = inject(AiSeoBaseSiteService);
  // Server-only: RESPONSE is null on the browser.
  private readonly response = inject(RESPONSE, { optional: true });

  readonly content: string;

  constructor() {
    const baseSiteId = this.baseSiteService.getBaseSiteId();
    this.response?.setHeader('Content-Type', 'text/plain');
    this.content = getLlmsTxt(baseSiteId);
  }
}

/**
 * Registers the /llms.txt Angular route BEFORE the Spartacus CMS wildcard route.
 *
 * Spartacus adds `{ path: '**', ... }` via APP_INITIALIZER (addCmsRoute) with
 * router.config.push() — i.e. at the END of the config. Angular matches routes
 * in order, so unshifting our route to the FRONT guarantees it wins over `**`.
 * The APP_INITIALIZER ordering relative to addCmsRoute is irrelevant: push→end,
 * unshift→front.
 *
 * Lives in the storefrontapp layer (not the core-lib service) so the reference
 * to LlmsTxtComponent stays within the app — core-libs must not import the demo app.
 */
export function provideLlmsTxtRoute(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => {
        const router = injector.get(Router);
        router.config.unshift({
          path: 'llms.txt',
          component: LlmsTxtComponent,
        });
      },
      deps: [Injector],
      multi: true,
    },
  ]);
}

/**
 * SPIKE stub — returns per-site llms.txt content.
 * Mirrors getLlmsTxt() in server.ts. In production this would read from config / CMS.
 */
function getLlmsTxt(baseSiteId: string | null): string {
  if (!baseSiteId) {
    return '# llms.txt\n> General LLM rules — applies to all sites on this origin.\n';
  }
  return `# llms.txt\n> Site: ${baseSiteId}\n`;
}
