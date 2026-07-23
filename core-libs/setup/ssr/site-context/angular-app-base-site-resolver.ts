/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ── Approach (b): createApplication() ────────────────────────────────────────
// This ENTIRE FILE is approach (b). Implements BaseSiteResolver by booting a
// minimal Angular app (HttpClient only) via createApplication() and fetching
// basesites through the Angular HTTP stack — reused across requests.

/**
 * SPIKE — not production code.
 * Approach (b): Angular createApplication() — DI context without HTML render.
 *
 * Boots a minimal Angular application (HttpClient only, no NgRx, no components)
 * to make the OCC basesites call through the Angular HTTP stack.
 * The ApplicationRef is created once at initialize() and reused across requests.
 *
 * Key finding during spike: BaseSiteService.getAll() uses NgRx Store + Effects,
 * so reusing the full Spartacus service graph would require StoreModule + EffectsModule.
 * This implementation uses HttpClient directly from the injector to isolate the
 * "Angular HTTP overhead vs plain fetch()" question — which is the real comparison point.
 * Full NgRx stack overhead is noted in the ADR as an additional concern.
 */

/* webpackIgnore: true */
import type { HttpClient } from '@angular/common/http';
import type { ApplicationRef, PlatformRef } from '@angular/core';
import { performance } from 'perf_hooks';
import { BaseSiteResolver, BaseSiteResolverConfig } from './base-site-resolver';

interface OccBaseSite {
  uid?: string;
  urlPatterns?: string[];
}

const EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;

function toJsRegExp(javaSyntax: string): RegExp | null {
  const parts = javaSyntax.match(EXTRACT_JAVA_REGEXP_MODIFIERS);
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
  return (site.urlPatterns ?? []).some((p) => toJsRegExp(p)?.test(url) ?? false);
}

export class AngularAppBaseSiteResolver implements BaseSiteResolver {
  private readonly occUrl: string;
  private readonly timeoutMs: number;
  private readonly cacheTtlMs: number;

  private appRef: ApplicationRef | null = null;
  private platformRef: PlatformRef | null = null;
  private httpClient: HttpClient | null = null;
  private cachedSites: OccBaseSite[] | null = null;
  private cachedAt = 0;
  private initPromise: Promise<void> | null = null;
  private fetchPromise: Promise<void> | null = null;

  constructor(config: BaseSiteResolverConfig) {
    const prefix = config.occPrefix ?? '/occ/v2';
    this.occUrl = `${config.occBaseUrl}${prefix}/basesites?fields=FULL`;
    this.timeoutMs = config.timeoutMs ?? 3000;
    this.cacheTtlMs = config.cacheTtlMs ?? 60_000;
  }

  async initialize(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.boot();
    }
    return this.initPromise;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    // Wait for boot() to finish so we never fetch before the cache is warm.
    await this.initialize();
    if (!this.cachedSites || Date.now() - this.cachedAt >= this.cacheTtlMs) {
      // Dedupe concurrent refreshes: share one in-flight fetch across callers.
      await (this.fetchPromise ??= this.fetchSites().finally(() => {
        this.fetchPromise = null;
      }));
    }
    if (!this.cachedSites) {
      return null;
    }
    const matched = this.cachedSites.find((site) => matchesSite(site, requestUrl));
    return matched?.uid ?? null;
  }

  async destroy(): Promise<void> {
    this.appRef?.destroy();
    this.platformRef?.destroy();
    this.appRef = null;
    this.platformRef = null;
    this.httpClient = null;
    this.cachedSites = null;
    this.initPromise = null;
    this.fetchPromise = null;
  }

  private async boot(): Promise<void> {
    const t0 = performance.now();

    // Dynamic import — Angular platform is heavy; we don't want it in module scope.
    // createApplication() is exported from @angular/platform-browser, NOT @angular/core.
    const { createApplication } = await import('@angular/platform-browser');
    const { platformServer } = await import('@angular/platform-server');
    const { provideHttpClient, withFetch, HttpClient } = await import(
      '@angular/common/http'
    );

    // On the SERVER there is no ambient Angular platform, so createApplication()
    // throws NG0401 (Missing Platform) unless we pass a BootstrapContext holding a
    // server platform. The SSR engine normally creates one per render; here we
    // create a standalone, long-lived one for this resolver.
    this.platformRef = platformServer();

    const bootPromise = createApplication(
      { providers: [provideHttpClient(withFetch())] },
      { platformRef: this.platformRef }
    );

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`createApplication() timed out after ${this.timeoutMs} ms`)),
        this.timeoutMs
      )
    );

    this.appRef = await Promise.race([bootPromise, timeoutPromise]);
    const elapsed = (performance.now() - t0).toFixed(1);
    console.log(`[create-application] Angular app created in ${elapsed} ms`);

    // Store HttpClient so fetchSites() can reuse it (enables TTL-based refresh).
    this.httpClient = this.appRef.injector.get(HttpClient);

    // Share this warm-up fetch via fetchPromise so a resolve() arriving during
    // boot() joins it instead of firing a second identical OCC call.
    await (this.fetchPromise ??= this.fetchSites().finally(() => {
      this.fetchPromise = null;
    }));
  }

  private async fetchSites(): Promise<void> {
    if (!this.httpClient) {
      console.error('[create-application] HttpClient not available — was initialize() called?');
      return;
    }

    const t0 = performance.now();
    // Wrap Observable in a race with AbortController-equivalent (timer + unsubscribe).
    const { firstValueFrom, timeout } = await import('rxjs');

    try {
      const body = await firstValueFrom(
        this.httpClient
          .get<{ baseSites?: OccBaseSite[] }>(this.occUrl)
          .pipe(timeout(this.timeoutMs))
      );
      const sites: OccBaseSite[] = (body.baseSites ?? []).map((s) => ({
        uid: s.uid,
        urlPatterns: s.urlPatterns,
      }));
      this.cachedSites = sites;
      this.cachedAt = Date.now();
      const elapsed = (performance.now() - t0).toFixed(1);
      console.log(
        `[create-application] OCC basesites fetched in ${elapsed} ms (${sites.length} sites)`
      );
    } catch (err) {
      const elapsed = (performance.now() - t0).toFixed(1);
      console.error(
        `[create-application] OCC basesites fetch failed after ${elapsed} ms:`,
        err
      );
    }
  }
}
