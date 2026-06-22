/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { OccConfig } from './occ-config';
import { provideConfigFactory } from '../../config/config-providers';

export const OCC_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
export const OCC_BASE_URL_META_TAG_PLACEHOLDER = 'OCC_BACKEND_BASE_URL_VALUE';
export const MEDIA_BASE_URL_META_TAG_NAME = 'media-backend-base-url';
export const MEDIA_BASE_URL_META_TAG_PLACEHOLDER =
  'MEDIA_BACKEND_BASE_URL_VALUE';
export const BFF_BASE_URL_META_TAG_NAME = 'bff-base-url';
export const BFF_BASE_URL_META_TAG_PLACEHOLDER = 'BFF_BASE_URL_VALUE';
/**
 * Alternative meta tag for the OCC base URL using the shorter variable name
 * `OCC_BASE_URL_VALUE` (as opposed to the legacy `OCC_BACKEND_BASE_URL_VALUE`).
 * Both tags target `backend.occ.baseUrl`; if both are present the legacy tag
 * (`occ-backend-base-url`) takes precedence because its factory runs first.
 */
export const OCC_BASE_URL_ALT_META_TAG_NAME = 'occ-base-url';
export const OCC_BASE_URL_ALT_META_TAG_PLACEHOLDER = 'OCC_BASE_URL_VALUE';

export function occServerConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(OCC_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== OCC_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { occ: { baseUrl } } }
    : {};
}

/**
 * Reads `<meta name="occ-base-url" content="OCC_BASE_URL_VALUE">` and sets
 * `backend.occ.baseUrl`. This is the short-form alias for the OCC base URL;
 * prefer this in new deployments. The legacy `occ-backend-base-url` tag is
 * still supported for backward compatibility.
 */
export function occBaseUrlFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(OCC_BASE_URL_ALT_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== OCC_BASE_URL_ALT_META_TAG_PLACEHOLDER
    ? { backend: { occ: { baseUrl } } }
    : {};
}

export function mediaServerConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(MEDIA_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== MEDIA_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { media: { baseUrl } } }
    : {};
}

/**
 * Reads `<meta name="bff-base-url" content="BFF_BASE_URL_VALUE">` from the
 * document and contributes `{ backend: { bff: { baseUrl } } }` to the
 * Spartacus config. Deploying a BFF alongside OCC only requires setting this
 * meta tag — the same CCv2 mechanism used for the OCC and media URLs.
 *
 * Example `index.html`:
 * ```html
 * <meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
 * ```
 */
export function bffServerConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(BFF_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== BFF_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { bff: { baseUrl } } }
    : {};
}

function getMetaTagContent(name: string, meta: Meta) {
  const metaTag = meta.getTag(`name="${name}"`);
  return metaTag && metaTag.content;
}

export function provideConfigFromMetaTags(): Provider[] {
  return [
    // Legacy OCC tag — kept for backward compatibility with existing CCv2 deployments.
    provideConfigFactory(occServerConfigFromMetaTagFactory, [Meta]),
    // Short-form OCC tag — preferred for new deployments. Runs after the legacy
    // factory so it wins if both tags are present.
    provideConfigFactory(occBaseUrlFromMetaTagFactory, [Meta]),
    provideConfigFactory(mediaServerConfigFromMetaTagFactory, [Meta]),
    provideConfigFactory(bffServerConfigFromMetaTagFactory, [Meta]),
  ];
}
