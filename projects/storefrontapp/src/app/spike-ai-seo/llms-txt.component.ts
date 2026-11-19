/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// SPIKE — approach (c). /llms.txt is reachable in the Angular pipeline because
// express.static uses fallthrough:true (dotted URL with no file → Angular
// catch-all). Clean text/plain needs stripping the renderToString() HTML shell:
// component sets Content-Type via RESPONSE and wraps body in ⟦LLMS⟧ markers;
// OptimizedSsrEngine cuts to the marker content. See ADR §4(c).

import {
  APP_INITIALIZER,
  Component,
  EnvironmentProviders,
  Injector,
  computed,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BaseSiteService } from '@spartacus/core';
import { RESPONSE } from '@spartacus/setup/ssr';

@Component({
  selector: 'cx-spike-llms-txt',
  standalone: true,
  template: '⟦LLMS⟧{{ content() }}⟦/LLMS⟧',
})
export class LlmsTxtComponent {
  private readonly response = inject(RESPONSE, { optional: true });
  // Request-active baseSite (per URL/domain), resolved before render → sync in SSR.
  private readonly baseSiteId = toSignal(inject(BaseSiteService).getActive(), {
    initialValue: null,
  });

  readonly content = computed(() =>
    [
      `# llms.txt — baseSite: ${this.baseSiteId() ?? '(none)'}`,
      'line1',
      'line2',
    ].join('\n')
  );

  constructor() {
    this.response?.setHeader('Content-Type', 'text/plain; charset=utf-8');
  }
}

/**
 * Registers `llms.txt` at the FRONT of router.config (unshift) so it wins over
 * the CMS `**` route that Spartacus appends (push) via APP_INITIALIZER.
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
