/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Example-app-only badge that shows the `@spartacus/core` version in the footer.
 * It is a plain standalone component injected into the footer outlet, so it does
 * not touch any CMS content.
 *
 * CAUTION: This belongs to our example storefrontapp only. It is NOT meant for
 * customers' applications and is NOT shipped in any Spartacus library.
 */
@Component({
  selector: 'app-footer-version',
  template: `@if (version) {
    <span class="app-footer-version">v{{ version }}</span>
  }`,
  styles: [
    `
      .app-footer-version {
        background-color: var(--cx-color-medium);
        border-radius: 8px;
        padding: 3px 8px;
        color: var(--cx-color-text);
        position: fixed;
        left: 10px;
        bottom: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterVersionComponent {
  readonly version = environment.coreVersion;
}
