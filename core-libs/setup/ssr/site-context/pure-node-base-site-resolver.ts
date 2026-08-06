/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * Approach (a): Pure Node — no Angular involved.
 *
 * Cacheless by design: every resolve() fetches base sites from OCC fresh, then
 * matches the request URL against each site's urlPatterns, falling back to the
 * configured default baseSite when nothing matches. No caching because SSR runs
 * as multiple instances that die/restart independently — a per-process cache
 * would drift between nodes and yield inconsistent results across the fleet.
 * The OCC /basesites call is cheap, so the consistency win beats the saved call.
 *
 * Replicates JavaRegExpConverter.toJsRegExp() from:
 *   core-libs/core/src/util/java-reg-exp-converter/java-reg-exp-converter.ts
 */

/* webpackIgnore: true */
import { performance } from 'perf_hooks';
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
  private readonly occUrl: string;
  private readonly timeoutMs: number;
  private readonly maxConcurrentOccCalls: number;
  private readonly defaultBaseSite: string | null;
  /** OCC calls currently in flight; the basis for the concurrency cap. */
  private inFlight = 0;

  constructor(_config: BaseSiteResolverConfig) {
    const prefix = _config.occPrefix ?? '/occ/v2';
    this.occUrl = `${_config.occBaseUrl}${prefix}/basesites?fields=FULL`;
    this.timeoutMs = _config.timeoutMs ?? 3000;
    this.maxConcurrentOccCalls = _config.maxConcurrentOccCalls ?? 10;
    this.defaultBaseSite = _config.defaultBaseSite ?? null;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    // Load shedding: refuse fast before touching OCC. This protects the Node
    // process (spec factor #1 — never hang/DoS the SSR server). It intentionally
    // does NOT protect the OCC backend from sustained load: with the cap at N,
    // up to N calls can still hit OCC concurrently. Guarding OCC's own capacity
    // is the backend's concern (its own scaling/rate limits), out of scope here.
    if (this.inFlight >= this.maxConcurrentOccCalls) {
      throw new ConcurrencyLimitError();
    }
    this.inFlight++;
    try {
      const sites = await this.fetchSites();
      const matched = sites.find((site) => matchesSite(site, requestUrl));
      return matched?.uid ?? this.defaultBaseSite;
    } finally {
      this.inFlight--;
    }
  }

  private async fetchSites(): Promise<OccBaseSite[]> {
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
