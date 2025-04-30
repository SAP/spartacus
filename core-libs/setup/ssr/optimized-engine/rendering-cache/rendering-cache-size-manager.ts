/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CacheEntrySizeCalculator,
  SsrOptimizationOptions,
} from '../ssr-optimization-options';
import { RenderingEntry } from './rendering-cache.model';

/**
 * Default implementation of the cache entry size calculator.
 *
 * For HTML string, it assumes each character is 2 bytes (utf-8 encoding).
 *
 * For error object, it assumes sums sizes of the `name`, `message` and `stack` string properties.
 *
 * CAUTION: the error object can be potentially anything and can have more properties (not necessarily strings),
 *          so it's just an approximation and it's prone to under-estimation!
 *
 * Note: it's not recommended to cache error objects.
 */
export class DefaultCacheEntrySizeCalculator
  implements CacheEntrySizeCalculator
{
  calculateSize(entry: RenderingEntry): number {
    // entry should have either `html` or `err` property
    if (entry.html) {
      return this.calculateHtmlSize(entry.html);
    }
    if (entry.err) {
      return this.calculateErrorSize(entry.err);
    }
    return 0;
  }

  /**
   * Calculates the size of the rendered HTML.
   *
   * It assumes each character is 2 bytes (utf-8 encoding).
   */
  protected calculateHtmlSize(html: string): number {
    return this.getStringSize(html);
  }

  /**
   * Roughly approximates the size of the error, by calculating the size of 3 string properties:
   * - name
   * - message
   * - stack
   *
   * It assumes each character is 2 bytes (utf-8 encoding).
   *
   * CAUTION: the error object can be anything and can have more properties (not necessarily strings),
   *          so it's just an approximation and it's prone to under-estimation!
   *
   * Note: it's not recommended to cache error objects.
   */
  protected calculateErrorSize(error: any): number {
    let size = 0;
    const properties = ['name', 'message', 'stack'];
    properties.forEach((property) => {
      if (error?.[property]) {
        size += this.getStringSize(error[property]);
      }
    });
    return size;
  }

  /**
   * Returns the size of the string in bytes.
   *
   * It assumes each character is 2 bytes (utf-8 encoding).
   */
  protected getStringSize(str: string): number {
    return 2 * Buffer.byteLength(str, 'utf8');
  }
}

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
   * Adds the entry size to the used cache size.
   */
  addEntrySize(entrySize: number): void {
    this.usedSize += entrySize;
  }

  /**
   * Removes the entry size from the used cache size.
   */
  removeEntrySize(entrySize: number): void {
    // we don't expect negative used size but adding Math.max(0, ...) as a safe guard
    this.usedSize = Math.max(0, this.usedSize - entrySize);
  }
}
