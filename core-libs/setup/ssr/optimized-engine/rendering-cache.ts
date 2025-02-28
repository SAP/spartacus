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

    let htmlSize = 0;
    if (this.options?.ttl) {
      entry.time = Date.now();
    }

    if (this.options?.ssrFeatureToggles?.cacheSizeInBytes) {
      if (html) {
        htmlSize = this.getHtmlSize(html);
      }

      this.renders.delete(key);
      this.tryRemoveOldestCacheEntries(htmlSize);

      if (shouldCache) {
        this.tryToCacheTheEntry(htmlSize, key, entry);
      }
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

  getHtmlSize(html: string) {
    return Buffer.byteLength(html, 'utf8');
  }

  getUsedCacheSize() {
    return this.usedCacheSize;
  }

  protected tryToCacheTheEntry(
    htmlSize: number,
    key: string,
    entry: RenderingEntry
  ) {
    if (
      this.options?.cacheLimit &&
      htmlSize + this.usedCacheSize <= this.options.cacheLimit
    ) {
      this.renders.set(key, entry);
      this.usedCacheSize += htmlSize;
    }
  }

  protected tryRemoveOldestCacheEntries(htmlSize: number): void {
    if (this.options?.cacheLimit) {
      while (
        this.usedCacheSize + htmlSize > this.options?.cacheLimit &&
        this.usedCacheSize > 0
      ) {
        const oldestKey = this.renders.keys().next().value;
        if (oldestKey !== undefined) {
          const oldestEntry = this.renders.get(oldestKey);
          const oldestHtmlSize = this.getHtmlSize(oldestEntry?.html || '');
          this.renders.delete(oldestKey);
          this.usedCacheSize = Math.max(0, this.usedCacheSize - oldestHtmlSize);
        } else {
          break; // Prevent infinite loop if cache is empty
        }
      }
    }
  }
}
