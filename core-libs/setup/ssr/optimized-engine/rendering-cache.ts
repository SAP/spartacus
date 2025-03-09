/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RenderingEntry } from './rendering-cache.model';
import { SsrOptimizationOptions } from './ssr-optimization-options';

export class RenderingCache {
  protected renders = new Map<string, RenderingEntry>();
  protected usedCacheSize = 0;

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

  getEntrySize(entry: any): number {
    let totalSize = 0;

    if (entry.err) {
      // errStr = JSON.stringify(entry.err)

      let errStr = '';

      if (entry.err.name) {
        errStr += entry.err.name;
      }

      if (entry.err.message) {
        errStr += entry.err.message;
      }

      if (entry.err.stack) {
        errStr += entry.err.stack;
      }

      totalSize += Buffer.byteLength(errStr, 'utf8');
    }

    if (entry.html) {
      totalSize += Buffer.byteLength(entry.html, 'utf8');
    }

    // const estimateRemainingPropsSize = 20;

    // totalSize += estimateRemainingPropsSize;

    return totalSize;
  }

  protected getUsedCacheSize() {
    return this.usedCacheSize;
  }

  protected tryToCacheTheEntry(
    entrySize: number,
    key: string,
    entry: RenderingEntry
  ) {
    if (
      this.options?.cacheLimit &&
      entrySize + this.usedCacheSize <= this.options.cacheLimit
    ) {
      entry.size = entrySize;
      this.renders.set(key, entry);
      this.usedCacheSize += entrySize;
    }
  }

  protected tryRemoveOldestCacheEntries(entrySize: number): void {
    if (this.options?.cacheLimit) {
      while (
        this.usedCacheSize + entrySize > this.options?.cacheLimit &&
        this.usedCacheSize > 0
      ) {
        const oldestKey = this.renders.keys().next().value;
        if (oldestKey !== undefined) {
          const oldestEntry = this.renders.get(oldestKey);
          const oldestEntrySize = oldestEntry?.size ?? 0;
          this.renders.delete(oldestKey);
          this.usedCacheSize = Math.max(0, this.usedCacheSize - oldestEntrySize);
        } else {
          break; // Prevent infinite loop if cache is empty
        }
      }
    }
  }
}
