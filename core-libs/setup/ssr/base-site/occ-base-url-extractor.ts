/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const OCC_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
const OCC_BASE_URL_PLACEHOLDER = 'OCC_BACKEND_BASE_URL_VALUE';

/** Extracts the configured OCC base URL from storefront index HTML. */
export function extractOccBaseUrlFromHtml(html: string): string | null {
  for (const tagMatch of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = new Map<string, string>();
    for (const attributeMatch of tagMatch[0].matchAll(
      /\b([^\s=/>]+)\s*=\s*(["'])(.*?)\2/gi
    )) {
      attributes.set(attributeMatch[1].toLowerCase(), attributeMatch[3]);
    }

    if (
      attributes.get('name')?.toLowerCase() !== OCC_BASE_URL_META_TAG_NAME
    ) {
      continue;
    }

    const value = attributes.get('content')?.trim();
    return value && value !== OCC_BASE_URL_PLACEHOLDER ? value : null;
  }

  return null;
}
