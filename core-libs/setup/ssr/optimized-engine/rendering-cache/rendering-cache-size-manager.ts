/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SsrOptimizationOptions } from '../ssr-optimization-options';
import { RenderingEntry } from './rendering-cache.model';

/**
 * It keeps track of the used cache size and helps making sure that adding new entries
 * doesn't cause exceeding the cache size limit.
 */
export class RenderingCacheSizeManager {
  /**
   * The total size of the used cache in bytes.
   */
  private usedSize = 0;

  protected readonly CACHE_SIZE_LIMIT: number =
    this.options?.cacheSizeBytes ?? 0;

  constructor(private options?: SsrOptimizationOptions) {
    this.validateOptions();
  }

  private validateOptions(): void {
    if (!this.options?.ssrFeatureToggles?.cacheLimitInBytes) {
      this.options?.logger?.error?.(
        'Cannot use `RenderingCacheSizeManager` when `ssrFeatureToggles.cacheLimitInBytes` is false!',
        {}
      );
    }
    if (
      typeof this.options?.cacheEntrySizeCalculator?.calculateSize !==
      'function'
    ) {
      this.options?.logger?.error?.(
        'No cache entry size calculator provided in `options.cacheEntrySizeCalculator`!',
        {}
      );
    }
    if (
      typeof this.options?.cacheSizeBytes !== 'number' ||
      this.options?.cacheSizeBytes <= 0
    ) {
      this.options?.logger?.error?.(
        'No cache size limit provided in `options.cacheSizeBytes`!',
        {}
      );
    }
  }

  /**
   * Calculates the size of the entry using the calculator provided in the options.
   */
  calculateEntrySize(entry: RenderingEntry): number {
    return this.options?.cacheEntrySizeCalculator?.calculateSize(entry) ?? 0;
  }

  /**
   * Returns true if there's enough space for the given entry size.
   */
  hasEnoughSpace(entrySize: number): boolean {
    return entrySize <= this.CACHE_SIZE_LIMIT - this.usedSize;
  }

  /**
   * Returns true if the entry is too large to ever fit in the cache.
   */
  isEntryTooLarge(entrySize: number): boolean {
    return entrySize > this.CACHE_SIZE_LIMIT;
  }

  /**
   * Tracks the memory usage of the entry.
   */
  trackEntrySize(entrySize: number): void {
    this.usedSize += entrySize;
  }

  /**
   * Un-tracks the memory usage of the entry.
   */
  untrackEntrySize(entrySize: number): void {
    // we don't expect negative used size but adding Math.max(0, ...) as a safe guard
    this.usedSize = Math.max(0, this.usedSize - entrySize);
  }
}
