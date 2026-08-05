/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ── Approach (c): Angular-native ─────────────────────────────────────────────
// SPIKE — not production code.
//
// Angular route component that serves llms.txt INSIDE the Angular SSR pipeline.
// The (c) counterpart to the Express handler used by approaches (a)/(b): the
// request falls through the Express catch-all into the Angular render, matches
// this route, and reads baseSiteId from AiSeoBaseSiteService (already resolved
// by SiteContextConfigInitializer via APP_INITIALIZER — no extra OCC call).
//
// ── Transport POC result (issue 04): DISPROVEN ──────────────────────────────
// Goal was: emit a clean `text/plain` body with NO HTML shell, using the
// BEFORE_APP_SERIALIZED hook, WITHOUT the deprecated inject(RESPONSE) path.
// Neither half is achievable with the current @angular/ssr CommonEngine:
//
//   1. Content-Type: BEFORE_APP_SERIALIZED runs inside renderInternal() BEFORE
//      platformState.renderToString(). It has NO handle to the Express Response
//      — it cannot set a header. The ONLY in-pipeline way to reach res is
//      inject(RESPONSE), which the issue forbids (legacy express-engine path).
//      So the response stays `text/html`.
//   2. Body shell: CommonEngine renders the app into the index.html document and
//      renderToString() serializes the WHOLE DOM. The component template lands
//      inside `<app-root>` inside `<html><head></head><body>…`. There is no
//      clean-plain-text output — the shell is always present.
//
// The BEFORE_APP_SERIALIZED callback below proves the hook DOES run and CAN read
// the in-pipeline resolved baseSiteId — but that is resolution, not transport.
// Transport for non-render handlers must happen at the Express layer (a)/(b).

import {
  APP_INITIALIZER,
  Component,
  EnvironmentProviders,
  Injector,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { Router } from '@angular/router';
import { AiSeoBaseSiteService } from '../../../../../core-libs/setup/ssr/site-context/angular-native-base-site-service';

@Component({
  selector: 'cx-spike-llms-txt',
  standalone: true,
  template: '{{ content }}',
})
export class LlmsTxtComponent {
  private readonly baseSiteService = inject(AiSeoBaseSiteService);

  // NO inject(RESPONSE): issue 04 forbids the deprecated express-engine path.
  // Consequence: this component cannot set Content-Type: text/plain. The body
  // is rendered into the HTML shell as text/html.
  readonly content: string;

  constructor() {
    const baseSiteId = this.baseSiteService.getBaseSiteId();
    this.content = getLlmsTxt(baseSiteId);
  }
}

/**
 * Registers the /llms.txt Angular route BEFORE the Spartacus CMS wildcard route.
 *
 * Spartacus adds `{ path: '**', ... }` via APP_INITIALIZER (addCmsRoute) with
 * router.config.push() — i.e. at the END of the config. Angular matches routes
 * in order, so unshifting our route to the FRONT guarantees it wins over `**`.
 *
 * Lives in the storefrontapp layer (not the core-lib service) so the reference
 * to LlmsTxtComponent stays within the app — core-libs must not import the app.
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
 * Honest test of the target hook (issue 04): a BEFORE_APP_SERIALIZED callback.
 * Proves the hook runs and can read the in-pipeline resolved baseSiteId. It
 * CANNOT set the Express Content-Type (no RESPONSE handle here) nor strip the
 * HTML shell (renderToString serializes the whole document afterwards).
 *
 * Register alongside provideLlmsTxtRoute() in app.config.server.ts to observe
 * the log line during SSR of /{baseSite}/llms.txt.
 */
export function provideLlmsTxtBeforeSerialized(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BEFORE_APP_SERIALIZED,
      multi: true,
      useFactory: () => {
        const baseSiteService = inject(AiSeoBaseSiteService);
        return () => {
          const baseSiteId = baseSiteService.getBaseSiteId();
          // Can read the resolved site — but cannot set headers or drop the
          // shell. Documented transport limitation of approach (c).
          console.log(
            `[approach-c] BEFORE_APP_SERIALIZED ran; baseSiteId=${baseSiteId ?? '(null)'}; ` +
              `cannot set Content-Type (no RESPONSE) — body will be full HTML shell (text/html).`
          );
        };
      },
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
