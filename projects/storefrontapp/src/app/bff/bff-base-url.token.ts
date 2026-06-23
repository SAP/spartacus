/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// Inlined until BFF meta tag constants are released in @spartacus/core (CXSPA-13587).
const BFF_BASE_URL_META_TAG_NAME = 'bff-base-url';
const BFF_BASE_URL_META_TAG_PLACEHOLDER = 'BFF_BASE_URL_VALUE';

/**
 * Base URL of the Vivaldi BFF, read from the
 * `<meta name="bff-base-url" content="BFF_BASE_URL_VALUE">` tag that the
 * CCv2 deployment platform injects at release time — the same mechanism
 * used for OCC_BACKEND_BASE_URL_VALUE.
 *
 * Falls back to `/bff/api` when the tag is absent or still contains the
 * un-replaced placeholder. In local development the Angular dev-server
 * proxies `/bff/*` to the real BFF via `proxy.conf.js`.
 *
 * Provide an override in tests or SSR:
 * ```ts
 * { provide: BFF_BASE_URL, useValue: 'https://bff.example.com/bff/api' }
 * ```
 */
export const BFF_BASE_URL = new InjectionToken<string>('BFF_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    const meta = inject(Meta);
    const tag = meta.getTag(`name="${BFF_BASE_URL_META_TAG_NAME}"`);
    const content = tag?.content ?? '';
    return content && content !== BFF_BASE_URL_META_TAG_PLACEHOLDER
      ? content
      : '/bff/';
  },
});
