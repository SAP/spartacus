/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SsrOptimizationOptions } from './ssr-optimization-options';

export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;
}

export class RenderingCache {
  protected renders = new Map<string, RenderingEntry>();

  constructor(private options?: SsrOptimizationOptions) {}

  setAsRendering(key: string) {
    this.renders.set(key, { rendering: true });
  }

  isRendering(key: string): boolean {
    return !!this.renders.get(key)?.rendering;
  }

  store(key: string, err?: Error | null, html?: string) {
    const entry: RenderingEntry = { err, html };
    if (this.options?.ttl) {
      entry.time = Date.now();
    }
    if (this.options?.cacheSize) {
      this.renders.delete(key);
      if (this.renders.size >= this.options.cacheSize) {
        this.renders.delete(this.renders.keys().next().value);
      }
    }
    // Related to CXSPA-6890
    // cache only if cachingStrategyResolver return true
    if (
      this.options?.cacheStrategyResolver &&
      this.options?.cacheStrategyResolver(this.options, entry)
    ) {
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
}
