/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — approach (a): Pure Node — no Angular involved.
 *
 * Replicates JavaRegExpConverter.toJsRegExp() from:
 *   core-libs/core/src/util/java-reg-exp-converter/java-reg-exp-converter.ts
 */

/* webpackIgnore: true */
import { performance } from 'node:perf_hooks';
import {
  BaseSiteResolver,
  BaseSiteResolverConfig,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

interface OccBaseSite {
  uid?: string;
  urlPatterns?: string[];
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
  protected readonly occUrl: string;
  protected readonly timeoutMs: number;
  protected readonly maxConcurrentOccCalls: number;
  protected readonly cacheTtlMs: number;
  protected readonly defaultBaseSite: string | null;

  /** Requests currently waiting for an OCC call to complete (cache miss path). */
  protected inFlight = 0;
  /** Shared in-flight OCC fetch — deduplicates concurrent cache-miss requests. */
  protected initPromise: Promise<OccBaseSite[]> | null = null;
  /** Cached baseSites list. */
  protected cachedSites: OccBaseSite[] | null = null;
  /** Timestamp (ms) when the cache was last populated. */
  protected cachedAt = 0;

  constructor(config: BaseSiteResolverConfig) {
    const prefix = config.occPrefix ?? '/occ/v2';
    this.occUrl = `${config.occBaseUrl}${prefix}/basesites?fields=FULL`;
    this.timeoutMs = config.timeoutMs ?? 3000;
    this.maxConcurrentOccCalls = config.maxConcurrentOccCalls ?? 10;
    this.cacheTtlMs = config.cacheTtlMs ?? 60_000;
    this.defaultBaseSite = config.defaultBaseSite ?? null;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    const sites = await this.getSites();
    const matched = sites.find((site) => matchesSite(site, requestUrl));
    return matched?.uid ?? this.defaultBaseSite;
  }

  private async getSites(): Promise<OccBaseSite[]> {
    // Cache hit: sub-millisecond regex match, no OCC call.
    if (this.cachedSites && Date.now() - this.cachedAt < this.cacheTtlMs) {
      return this.cachedSites;
    }

    // Load shedding: cap requests waiting for an OCC cache refresh.
    if (this.inFlight >= this.maxConcurrentOccCalls) {
      throw new ConcurrencyLimitError();
    }
    this.inFlight++;

    try {
      // Dedup: concurrent cache-miss requests share a single OCC fetch.
      if (!this.initPromise) {
        this.initPromise = this.fetchSites()
          .then((sites) => {
            this.cachedSites = sites;
            this.cachedAt = Date.now();
            return sites;
          })
          .finally(() => {
            this.initPromise = null;
          });
      }
      return await this.initPromise;
    } finally {
      this.inFlight--;
    }
  }

  protected async fetchSites(): Promise<OccBaseSite[]> {
    const t0 = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.occUrl, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new OccUnavailableError(
          `OCC basesites responded ${response.status}`
        );
      }
      const body = (await response.json()) as { baseSites?: OccBaseSite[] };
      const sites: OccBaseSite[] = (body.baseSites ?? []).map((s) => ({
        uid: s.uid,
        urlPatterns: s.urlPatterns,
      }));
      const elapsed = (performance.now() - t0).toFixed(1);
      console.log(
        `[pure-node] OCC basesites fetched in ${elapsed} ms (${sites.length} sites)`
      );
      return sites;
    } catch (err) {
      const elapsed = (performance.now() - t0).toFixed(1);
      if ((err as Error).name === 'AbortError') {
        console.error(
          `[pure-node] OCC basesites timed out after ${this.timeoutMs} ms`
        );
        throw new OccUnavailableError(
          `OCC basesites timed out after ${this.timeoutMs} ms`
        );
      }
      console.error(
        `[pure-node] OCC basesites fetch failed after ${elapsed} ms:`,
        err
      );
      throw err instanceof OccUnavailableError
        ? err
        : new OccUnavailableError((err as Error).message);
    } finally {
      clearTimeout(timer);
    }
  }
}
