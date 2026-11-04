/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const OCC_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
const OCC_BASE_URL_PLACEHOLDER = 'OCC_BACKEND_BASE_URL_VALUE';
const META_TAG_PATTERN = /<meta\b[^>]*>/gi;
const META_TAG_ATTRIBUTE_PATTERN =
  /\b(?<name>[^\s=/>]+)\s*=\s*(?<quote>["'])(?<value>.*?)\k<quote>/gi;

type MetaTag = ReadonlyMap<string, string>;

/** Extracts the configured OCC base URL from storefront index HTML. */
export function extractOccBaseUrlFromHtml(html: string): string | null {
  const metaTagsByName = new Map(
    extractMetaTags(html)
      .flatMap((metaTag) => {
        const name = metaTag.get('name')?.toLowerCase();
        return name ? [[name, metaTag] as const] : [];
      })
      .reverse()
  );
  const value = metaTagsByName
    .get(OCC_BASE_URL_META_TAG_NAME)
    ?.get('content')
    ?.trim();

  return value && value !== OCC_BASE_URL_PLACEHOLDER ? value : null;
}

function extractMetaTags(html: string): MetaTag[] {
  return Array.from(html.matchAll(META_TAG_PATTERN), ([metaTag]) => {
    return new Map(
      Array.from(metaTag.matchAll(META_TAG_ATTRIBUTE_PATTERN), ({ groups }) => {
        const { name, value } = groups as { name: string; value: string };
        return [name.toLowerCase(), value] as const;
      })
    );
  });
}
