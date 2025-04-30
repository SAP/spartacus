/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RenderingEntry } from './rendering-cache.model';
// import { SsrOptimizationOptions } from './ssr-optimization-options';

// SPIKE TEMPORARY:

interface SsrOptimizationOptions {
  cacheSizeBytesApproximation?: number;
  shouldCacheRenderingResult?: (args: {
    options: SsrOptimizationOptions;
    entry: RenderingEntry;
  }) => boolean;
  ttl?: number;
  ssrFeatureToggles?: {
    cacheLimitInBytes?: boolean;
  };
  cache?: boolean;
  cacheSize?: number;
}

export class RenderingCache {
  protected renders = new Map<string, RenderingEntry>();

  /**
   * The rough approximate size of the cache in bytes.
   *
   * CAUTION: It's not guaranteed to be exact memory actually used by the NodeJS engine.
   */
  protected usedBytesApproximation = 0;

  constructor(private options?: SsrOptimizationOptions) {}

  setAsRendering(key: string) {
    this.renders.set(key, { rendering: true });
  }

  isRendering(key: string): boolean {
    return !!this.renders.get(key)?.rendering;
  }

  store(key: string, err?: Error | null, html?: string) {
    const entry: RenderingEntry = { err, html };

    // cache only if shouldCacheRenderingResult return true
    const shouldCache = this.options?.shouldCacheRenderingResult?.({
      options: this.options,
      entry,
    });

    let entrySize = 0;

    if (this.options?.ttl) {
      entry.time = Date.now();
    }

    if (this.options?.ssrFeatureToggles?.cacheLimitInBytes) {
      if (!shouldCache) {
        return;
      }

      if (html || err) {
        entrySize = this.getEntrySize(entry);
      }

      this.renders.delete(key);
      this.tryRemoveOldestCacheEntries(entrySize);

      this.tryToCacheTheEntry(entrySize, key, entry);
      return;
    }

    if (this.options?.cacheSize) {
      this.renders.delete(key);
      if (this.renders.size >= this.options.cacheSize) {
        const oldestKey = this.renders.keys().next().value;
        if (oldestKey !== undefined) {
          this.renders.delete(oldestKey);
        }
      }
    }

    if (shouldCache) {
      this.renders.set(key, entry);
    }
  }

  get(key: string): RenderingEntry | undefined {
    return this.renders.get(key);
  }

  clear(key: string) {
    this.renders.delete(key);
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

  /**
   * Rough approximation of the bytes size of an error object.
   *
   * CAUTION: It's not guaranteed to be exact memory actually used by the NodeJS engine.
   *
   * Note: it's not recommended to cache error objects.
   *
   *
   * The error object doesn't have to be an instance of Error.
   * - For Error instance having string properties `name`, `message` and `stack`,
   *   this function will return just a sum of bytes of these strings using utf-8 encoding.
   * - it won't iterate over other properties
   *
   * Therefore the result size can be UNDERESTIMATED!
   */
  private getErrorBytesApproximation(error: any): number {
    let size = 0;

    if (error?.name) {
      size += this.getStringBytesApproximation(error.name);
    }
    if (error?.message) {
      size += this.getStringBytesApproximation(error.message);
    }
    if (error?.stack) {
      size += this.getStringBytesApproximation(error.stack);
    }

    // For simplicity of the implementation, we don't iterate over error properties
    // Please note it's not recommended to cache errors anyway

    return size;
  }

  /**
   * Rough approximation of the bytes size of a string using utf-8 encoding in V8 engine.
   *
   * We assume
   */
  getStringBytesApproximation(str: string): number {
    return Buffer.byteLength(str, 'utf8');
  }

  getEntrySize(entry: RenderingEntry): number {
    let totalSize = 0;

    // Calculate HTML size
    if (entry.html) {
      return this.getStringBytesApproximation(entry.html);
    }

    // Note: it's not recommended to cache errors
    //       the following is just a rough approximation prone to under-estimation
    if (entry.err) {
      return this.getErrorBytesApproximation(entry.err);
    }

    return totalSize;
  }

  protected getUsedCacheSize() {
    return this.usedBytesApproximation;
  }

  protected tryToCacheTheEntry(
    entrySize: number,
    key: string,
    entry: RenderingEntry
  ) {
    if (
      this.options?.cacheSizeBytesApproximation &&
      entrySize + this.usedBytesApproximation <=
        this.options.cacheSizeBytesApproximation
    ) {
      entry._bytesSizeApproximation = entrySize;
      this.renders.set(key, entry);
      this.usedBytesApproximation += entrySize;
    }
  }

  protected tryRemoveOldestCacheEntries(entrySize: number): void {
    if (this.options?.cacheSizeBytesApproximation) {
      while (
        this.usedBytesApproximation + entrySize >
          this.options?.cacheSizeBytesApproximation &&
        this.usedBytesApproximation > 0
      ) {
        const oldestKey = this.renders.keys().next().value;
        if (oldestKey !== undefined) {
          const oldestEntry = this.renders.get(oldestKey);
          const oldestEntrySize = oldestEntry?._bytesSizeApproximation ?? 0;
          this.renders.delete(oldestKey);
          this.usedBytesApproximation = Math.max(
            0,
            this.usedBytesApproximation - oldestEntrySize
          );
        } else {
          break; // Prevent infinite loop if cache is empty
        }
      }
    }
  }
}
