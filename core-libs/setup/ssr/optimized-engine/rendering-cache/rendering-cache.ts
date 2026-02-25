/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SsrOptimizationOptions } from '../ssr-optimization-options';
import { RenderingCacheSizeManager } from './rendering-cache-size-manager';
import { RenderingEntry } from './rendering-cache.model';

export class RenderingCache {
  protected renders = new Map<string, RenderingEntry>();

  constructor(private options?: SsrOptimizationOptions) {}

  // Don't use directly, but use `sizeManager` getter instead
  // The `sizeManager` should be used only when `ssrFeatureToggles.limitCacheByMemory` is set to true
  private _sizeManager: RenderingCacheSizeManager;
  private get sizeManager(): RenderingCacheSizeManager {
    if (!this._sizeManager) {
      this._sizeManager = new RenderingCacheSizeManager(this.options);
    }
    return this._sizeManager;
  }

  setAsRendering(key: string) {
    this.renders.set(key, { rendering: true });
  }

  isRendering(key: string): boolean {
    return !!this.renders.get(key)?.rendering;
  }

  /**
   * Store the entry, respecting the cache limit.
   *
   * Depending on the `ssrFeatureToggles.limitCacheByMemory` option,
   * it will respect either the bytes limit (`options.cacheSizeBytes`) or the entries number limit (`options.cacheSize`).
   */
  store(key: string, err?: Error | null, html?: string) {
    const entry: RenderingEntry = { err, html };
    if (this.options?.ttl) {
      entry.time = Date.now();
    }

    // Remove old entry for the key. The entry may exist for the key, because we've previously called `setAsRendering()` for it:
    this.renders.delete(key);

    if (
      !this.options?.shouldCacheRenderingResult?.({
        options: this.options,
        entry,
      })
    ) {
      return;
    }

    // Use the size manager only when `ssrFeatureToggles.limitCacheByMemory` is set to true:
    if (this.options?.ssrFeatureToggles?.limitCacheByMemory) {
      this.storeUsingMemoryLimit(key, entry);
    } else {
      this.storeUsingEntriesLimit(key, entry);
    }
  }

  /**
   * Store the entry, respecting the bytes limit.
   *
   * If needed, removes oldest entries until there's enough space for the new entry.
   */
  private storeUsingMemoryLimit(key: string, entry: RenderingEntry): void {
    const entrySize = this.sizeManager.calculateEntrySize(entry);

    if (this.sizeManager.isEntryLargerThanCacheLimit(entrySize)) {
      return;
    }

    this.clearOldestEntriesForSize(entrySize);

    entry._size = entrySize;
    this.renders.set(key, entry);
    this.sizeManager.trackEntrySize(entrySize);
  }

  /**
   * Clear oldest entries until there's enough space for the new entry.
   */
  private clearOldestEntriesForSize(requiredSize: number): void {
    while (
      !this.sizeManager.hasSpaceForEntrySize(requiredSize) &&
      this.renders.size > 0
    ) {
      const oldestKey = this.renders.keys().next().value;
      if (oldestKey === undefined) {
        // Still not enough space, but no more entries to clear.
        // In practice this case should never happen, because initially we checked `isEntryLargerThanCacheLimit` -
        // we validated whether the new entry's size is not bigger than the total cache size limit.
        break;
      }

      this.clear(oldestKey);
    }
  }

  /**
   * Store the entry, respecting the entries limit.
   *
   * If needed, removes oldest entry when number of entries limit is reached.
   *
   * @deprecated since v2211.42 - use `storeUsingBytesLimit` method instead.
   *             This method will be removed together with the feature toggle `ssrFeatureToggles.limitCacheByMemory`.
   */
  private storeUsingEntriesLimit(key: string, entry: RenderingEntry): void {
    if (
      this.options?.cacheSize &&
      this.renders.size >= this.options.cacheSize
    ) {
      const oldestKey = this.renders.keys().next().value;
      if (oldestKey !== undefined) {
        this.renders.delete(oldestKey);
      }
    }
    this.renders.set(key, entry);
  }

  get(key: string): RenderingEntry | undefined {
    return this.renders.get(key);
  }

  clear(key: string) {
    const entry = this.renders.get(key);
    this.renders.delete(key);

    // Use the size manager only when `ssrFeatureToggles.limitCacheByMemory` is set to true.
    if (this.options?.ssrFeatureToggles?.limitCacheByMemory) {
      this.sizeManager.untrackEntrySize(entry?._size ?? 0);
    }
  }

  isReady(key: string): boolean {
    const entry = this.renders.get(key);
    const isRenderPresent = entry?.html || entry?.err;
    return isRenderPresent && this.isFresh(key);
  }

  isFresh(key: string): boolean {
    if (!this.options?.ttl) {
      return true;
    }
    return Date.now() - (this.renders.get(key)?.time ?? 0) < this.options?.ttl;
  }
}
