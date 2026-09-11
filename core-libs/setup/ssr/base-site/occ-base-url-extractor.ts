/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — approach (a): Pure Node — no Angular involved.
 *
 * Fallback utility: extracts the OCC backend base URL from an index.html
 * string. Use when CX_BASE_URL is not available as a Node.js environment
 * variable (e.g. Model T hosting injects it only as an index.html meta tag
 * placeholder via the deployment script).
 */

const OCC_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';

/**
 * Sentinel written by the deployment script before the real URL is substituted.
 * A meta tag carrying this value must be treated as absent.
 */
const OCC_BASE_URL_META_TAG_PLACEHOLDER = 'OCC_BACKEND_BASE_URL_VALUE';

/**
 * Extracts the OCC backend base URL from an index.html string.
 *
 * Returns null when:
 * - no `<meta name="occ-backend-base-url" content="...">` tag is present,
 * - the tag content equals the unsubstituted deployment placeholder.
 *
 * Handles both attribute orderings:
 *   `<meta name="..." content="...">`
 *   `<meta content="..." name="...">`
 */
export function extractOccBaseUrlFromHtml(html: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]+name=["']${OCC_BASE_URL_META_TAG_NAME}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      'i'
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${OCC_BASE_URL_META_TAG_NAME}["'][^>]*>`,
      'i'
    ),
  ];
  for (const pattern of patterns) {
    const url = html.match(pattern)?.[1]?.trim();
    if (url && url !== OCC_BASE_URL_META_TAG_PLACEHOLDER) {
      return url;
    }
  }
  return null;
}
