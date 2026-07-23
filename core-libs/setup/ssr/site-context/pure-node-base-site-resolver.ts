/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ── Approach (a): Pure Node ──────────────────────────────────────────────────
// This ENTIRE FILE is approach (a). Implements BaseSiteResolver with plain
// fetch() + in-memory cache + a ported JavaRegExpConverter — zero Angular.

/**
 * SPIKE — not production code.
 * Approach (a): Pure Node — no Angular involved.
 *
 * Fetches all base sites from OCC once at initialize() and caches them.
 * Per-request work is a simple regex match against the cached list.
 *
 * Replicates JavaRegExpConverter.toJsRegExp() from:
 *   core-libs/core/src/util/java-reg-exp-converter/java-reg-exp-converter.ts
 */

/* webpackIgnore: true */
import { performance } from 'perf_hooks';
import { BaseSiteResolver, BaseSiteResolverConfig } from './base-site-resolver';

interface OccBaseSite {
  uid?: string;
  urlPatterns?: string[];
}

interface CachedSites {
  sites: OccBaseSite[];
  fetchedAt: number;
}

/**
 * Converts a Java-syntax regexp string to a JavaScript RegExp.
 * Handles Java inline modifiers like (?i), (?u), (?iu) etc.
 * Returns null when the pattern cannot be converted.
 *
 * Logic ported verbatim from JavaRegExpConverter to avoid Angular dependency.
 */
function toJsRegExp(javaSyntax: string): RegExp | null {
  const parts = javaSyntax.match(/^(\(\?([a-z]+)\))?(.*)/);
  if (!parts) {
    return null;
  }
  const [, , modifiers, jsSyntax] = parts;
  try {
    return new RegExp(jsSyntax, modifiers);
  } catch {
    return null;
  }
}

function matchesSite(site: OccBaseSite, url: string): boolean {
  return (site.urlPatterns ?? []).some(
    (pattern) => toJsRegExp(pattern)?.test(url) ?? false
  );
}

export class PureNodeBaseSiteResolver implements BaseSiteResolver {
  private readonly occUrl: string;
  private readonly timeoutMs: number;
  private readonly cacheTtlMs: number;
  private cache: CachedSites | null = null;
  /** Pending initialize() promise — avoids concurrent OCC calls on startup. */
  private initPromise: Promise<void> | null = null;

  constructor(_config: BaseSiteResolverConfig) {
    const prefix = _config.occPrefix ?? '/occ/v2';
    this.occUrl = `${_config.occBaseUrl}${prefix}/basesites?fields=FULL`;
    this.timeoutMs = _config.timeoutMs ?? 3000;
    this.cacheTtlMs = _config.cacheTtlMs ?? 60_000;
  }

  async initialize(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.fetchAndCache();
    }
    return this.initPromise;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    const sites = await this.getSites();
    if (!sites) {
      return null;
    }
    const matched = sites.find((site) => matchesSite(site, requestUrl));
    return matched?.uid ?? null;
  }

  async destroy(): Promise<void> {
    this.cache = null;
    this.initPromise = null;
  }

  private async getSites(): Promise<OccBaseSite[] | null> {
    if (this.cache && Date.now() - this.cache.fetchedAt < this.cacheTtlMs) {
      return this.cache.sites;
    }
    await this.fetchAndCache();
    return this.cache?.sites ?? null;
  }

  private async fetchAndCache(): Promise<void> {
    const t0 = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.occUrl, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`OCC basesites responded ${response.status}`);
      }
      const body = (await response.json()) as { baseSites?: OccBaseSite[] };
      const sites: OccBaseSite[] = (body.baseSites ?? []).map((s) => ({
        uid: s.uid,
        urlPatterns: s.urlPatterns,
      }));
      this.cache = { sites, fetchedAt: Date.now() };
      const elapsed = (performance.now() - t0).toFixed(1);
      console.log(
        `[pure-node] OCC basesites fetched in ${elapsed} ms (${sites.length} sites)`
      );
    } catch (err) {
      const elapsed = (performance.now() - t0).toFixed(1);
      if ((err as Error).name === 'AbortError') {
        console.error(
          `[pure-node] OCC basesites timed out after ${this.timeoutMs} ms`
        );
      } else {
        console.error(
          `[pure-node] OCC basesites fetch failed after ${elapsed} ms:`,
          err
        );
      }
      // Leave cache stale if it exists; resolve() will return null on first call.
    } finally {
      clearTimeout(timer);
    }
  }
}
