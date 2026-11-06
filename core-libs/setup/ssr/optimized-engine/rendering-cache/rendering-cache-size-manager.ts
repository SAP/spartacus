/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
   * This value will change as we add or remove entries from the cache.
   */
  private usedSize = 0;

  /**
   * The maximum size of the cache in bytes, configured in the SSR options.
   */
  protected readonly CACHE_SIZE_LIMIT: number =
    this.options?.cacheSizeMemory ?? 0;

  constructor(private options?: SsrOptimizationOptions) {
    this.validateOptions();
  }

  /**
   * Validates the `SsrOptimizationOptions` needed for this class to work properly.
   * In case of invalid options, it will log an error using the configured logger.
   */
  private validateOptions(): void {
    if (
      typeof this.options?.cacheEntrySizeCalculator?.calculateSize !==
      'function'
    ) {
      this.options?.logger?.error?.(
        'Invalid SSR config `options.cacheEntrySizeCalculator`! It should be an object with the `calculateSize()` method.',
        {}
      );
    }
    if (
      typeof this.options?.cacheSizeMemory !== 'number' ||
      this.options?.cacheSizeMemory <= 0
    ) {
      this.options?.logger?.error?.(
        'Invalid SSR config `options.cacheSizeMemory`! It should be a number greater than 0.',
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
   * Tells whether there's enough space for the given entry size.
   */
  hasSpaceForEntrySize(entrySize: number): boolean {
    return entrySize <= this.CACHE_SIZE_LIMIT - this.usedSize;
  }

  /**
   * Tells whether the entry is too large to ever fit in the cache
   * (i.e. this single entry is larger than the total possible cache size).
   */
  isEntryLargerThanCacheLimit(entrySize: number): boolean {
    return entrySize > this.CACHE_SIZE_LIMIT;
  }

  /**
   * Adds the size of the entry to the total tracked used size.
   */
  trackEntrySize(entrySize: number): void {
    this.usedSize += entrySize;

    // This should never happen. MAX_SAFE_INTEGER is 7.9 Petabytes, but in reality NodeJS pods have only some Gigabytes of memory.
    // It's a safe guard in case of some bug.
    if (this.usedSize > Number.MAX_SAFE_INTEGER) {
      this.options?.logger?.error?.(
        'RenderingCacheSizeManager: the used size is greater than the MAX_SAFE_INTEGER value! This should never happen!',
        {}
      );
      this.usedSize = Number.MAX_SAFE_INTEGER;
    }
  }

  /**
   * Subtracts the size of the entry from the total tracked used size.
   */
  untrackEntrySize(entrySize: number): void {
    this.usedSize = this.usedSize - entrySize;

    // This should never happen. It's a safe guard in case of some bug.
    if (this.usedSize < 0) {
      this.options?.logger?.error?.(
        'RenderingCacheSizeManager: the used size is negative! This should never happen!',
        {}
      );
      this.usedSize = 0; // clear the used size to avoid negative values
    }
  }
}
