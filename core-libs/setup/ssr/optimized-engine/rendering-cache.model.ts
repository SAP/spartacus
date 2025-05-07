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
   * Approximate size of the entry in bytes.
   *
   * It's used only when `ssrFeatureToggles.limitCacheByMemory` is set to true.
   */
  _size?: number;
}
