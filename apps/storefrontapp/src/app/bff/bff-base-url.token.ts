/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { InjectionToken, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// These constants will be importable from @spartacus/core once the library
// version containing CXSPA-13587 is released. Until then they are inlined.
const BFF_BASE_URL_META_TAG_NAME = 'bff-base-url';
const BFF_BASE_URL_META_TAG_PLACEHOLDER = 'BFF_BASE_URL_VALUE';

/**
 * Base URL where the Vivaldi BFF mounts its tRPC handler.
 *
 * `<base-url>/<router>.<procedure>` is the URL the tRPC client posts to —
 * Vivaldi's fastify plugin uses `@trpc/server/adapters/fastify` with no
 * extra `/trpc` segment. The mount path comes from `apps/bff/vivaldi.ts`
 * (`tRPC.prefix: '/api'`) and is rewritten to `/bff/api` in dev by
 * `@vivaldi/fastify` (it prepends `DEFAULT_BFF_PREFIX = '/bff'`).
 *
 * The value is resolved in order of precedence:
 *  1. CCv2 deploy-time substitution via `<meta name="bff-base-url">` in index.html
 *  2. Falls back to `/bff/api` (proxied by the Angular dev-server to the
 *     real BFF via `proxy.conf.js`)
 *
 * For SSR, override in `app.module.server.ts` with an absolute URL from
 * `process.env['BFF_BASE_URL']` — Node has no document origin for relative URLs.
 */
export const BFF_BASE_URL = new InjectionToken<string>('BFF_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    const meta = inject(Meta);
    const tag = meta.getTag(`name="${BFF_BASE_URL_META_TAG_NAME}"`);
    const content = tag?.content ?? '';
    return content && content !== BFF_BASE_URL_META_TAG_PLACEHOLDER
      ? content
      : '/bff/api';
  },
});
