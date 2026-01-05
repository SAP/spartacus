/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export function getUrl(urlString: string): URL | null {
  try {
    return new URL(urlString);
  } catch {
    return null;
  }
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export function isHttpOrHttps(url: URL) {
  return url.protocol === 'http:' || url.protocol === 'https:';
}
