/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Represents a rendering entry in the rendering cache.
 */
export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;

  /**
   * Rough approximate size of the entry in bytes.
   *
   * Note: it's used only when `ssrFeatureToggles.cacheLimitInBytes` is set to true.
   *
   * CAUTION: It's not guaranteed to be exact memory actually used by the NodeJS engine.
   *          It's only a best effort approximation using utf-8 encoding for strings:
   *          - for successful renders it approximates the size of the rendered HTML string, assuming 2 bytes per character
   *          - for errors it sums the approximate size of the 3 string properties: `name`, `message` and `stack`,
   *            but not other unknown properties, so it's prone to under-estimation!
   *            Note: it's not recommended to cache errors.
   */
  _size?: number;
}
