/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  LoggerService,
  OCC_BASE_URL_META_TAG_NAME,
  OccConfig,
  occServerConfigFromMetaTagFactory,
  WindowRef,
} from '@spartacus/core';
import { baseUrlMap, fallbackBaseUrl } from './ssr-baser-url-mappings';

/**
 * Determine an OCC Base URL to use in SSR processing and set it to the OCC Base URL Meta tag.
 *
 * Allows for server-side assignment of OCC base URL without exposing url mappings.
 */
export const ssrBaseUrl = (): OccConfig => {
  const meta = inject(Meta);
  const windowRef = inject(WindowRef);
  const logger = inject(LoggerService);

  /* read injected data */
  /** Will be the value injected at pod startup */
  const initialBaseUrl =
    occServerConfigFromMetaTagFactory(meta).backend?.occ?.baseUrl;
  logger.error(`initialBaseUrl: ${initialBaseUrl}`);

  /* read request data */
  const originUrl = new URL(windowRef.location.origin as string);
  // const hrefUrl = new URL(windowRef.location.href as string); // If we need to read request path
  logger.error(
    `windowRef: ${JSON.stringify(windowRef.location, undefined, 2)}`
  );

  /* Business logic to determine baseUrl */
  // Uses a simple map, fallback to injected value, then hard-coded fallback
  const baseUrl =
    baseUrlMap[originUrl?.hostname] ?? initialBaseUrl ?? fallbackBaseUrl;

  /* Set meta tag for CSR configuration */
  meta.updateTag({ name: OCC_BASE_URL_META_TAG_NAME, content: baseUrl });
  logger.error(`set meta tag to: ${baseUrl}`);

  /* Return config partial for SSR configuration */
  const config = {
    backend: { occ: { baseUrl } },
  } satisfies OccConfig;
  logger.error(`adding config: ${JSON.stringify(config, undefined, 2)}`);
  return config;
};
