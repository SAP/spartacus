/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
   * Approximate size of the entry in bytes.
   *
   * It's used only when `ssrFeatureToggles.limitCacheByMemory` is set to true.
   */
  _size?: number;
}

/**
 * Custom strategy for calculating the size of a cache entry.
 * It's needed to keep track of the used cache size.
 */
export interface CacheEntrySizeCalculator {
  calculateSize(entry: RenderingEntry): number;
}
