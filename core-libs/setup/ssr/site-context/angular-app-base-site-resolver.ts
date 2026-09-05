/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ── Approach (b): createApplication() — honest NgRx rewrite ─────────────────
// This ENTIRE FILE is approach (b). Implements BaseSiteResolver using genuine
// Spartacus DI: SiteContextConfigInitializer + ConfigInitializerService +
// BaseSiteService (NgRx Store + Effects). No copied regex logic.

/**
 * SPIKE — not production code.
 * Approach (b): Angular renderApplication() with full Spartacus DI graph.
 *
 * Architecture: per-request full server bootstrap via renderApplication().
 *
 * Why renderApplication() (not bare bootstrapApplication + platformServer):
 *   bootstrapApplication() on a bare platformServer() throws:
 *     - NG0401 unless a BootstrapContext { platformRef } is supplied, and
 *     - NG05104 because no server document exists, so the root component
 *       selector matches no host element.
 *   renderApplication(bootstrap, { document, url }) solves both: it calls
 *   createServerPlatform() which provides INITIAL_CONFIG (a real server
 *   document via domino, giving the <app-root> host element), then invokes
 *   our bootstrap fn WITH { platformRef } as the BootstrapContext, then awaits
 *   applicationRef.whenStable() — HttpClient(withFetch) registers a pending
 *   task, so whenStable() waits for the OCC call to complete before serialize.
 *
 * Why read the site in a BEFORE_APP_SERIALIZED callback:
 *   renderApplication() runs BEFORE_APP_SERIALIZED callbacks AFTER whenStable()
 *   and BEFORE it destroys the platform. That is the one window where the NgRx
 *   store + SiteContextConfig are fully populated and the injector is still
 *   alive. Callbacks may be async, so we await ConfigInitializerService there.
 *
 * Why per-request:
 *   SiteContextConfigInitializer reads the current URL via WindowRef.location.href.
 *   renderApplication() creates a fresh server platform per call and destroys it
 *   after, so each resolve() gets an isolated DI tree bound to one request URL.
 *
 * Why no TTL cache:
 *   Per Krzysztof Platis (sync 2026-08-03): in-memory cache across SSR workers
 *   is not viable — workers crash and restart with inconsistent cache state, and
 *   the infrastructure does not support a shared external cache. Each request
 *   must fetch from OCC directly.
 *
 * Minimum provider set discovered:
 *   - provideServerRendering()                             ← server DOCUMENT + zone
 *   - provideHttpClient(withFetch())
 *   - StoreModule.forRoot({}) + EffectsModule.forRoot([])  ← NgRx root
 *   - SiteContextModule.forRoot()                          ← site context Store + Effects
 *   - BaseOccModule.forRoot()                              ← OCC adapters + SiteAdapter
 *   - provideConfig({ backend.occ })                       ← OCC URL
 *   - { provide: WindowRef, useValue: { location: { href: requestUrl } } }
 *   - { provide: BEFORE_APP_SERIALIZED, multi: true, ... } ← reads resolved site
 *
 * Code-reuse delta vs approach (a):
 *   - (a) copies toJsRegExp() (~20 lines) from JavaRegExpConverter and the full
 *     OCC response parsing loop (~15 lines).
 *   - (b) reuses JavaRegExpConverter, BaseSiteService, SiteContextConfigInitializer,
 *     and all OCC normalizers via DI — zero copied Spartacus logic in this file.
 *   - Cost: per-request Angular DI boot overhead (see benchmark numbers).
 *
 * Platform lifecycle + concurrency on CCv2:
 *   renderApplication() calls platformServer() (a process-level singleton) then
 *   destroys it in a finally via setTimeout(0). Two renderApplication() calls
 *   overlapping in time therefore risk colliding on the platform singleton
 *   (createPlatform throws if one already exists). CCv2 runs one Node.js process
 *   per pod, so this is a real per-process concurrency limit — see benchmark
 *   scenario 4 (concurrent) for whether it manifests under load.
 */

/* webpackIgnore: true */
// JIT compiler needed for Angular partial compilation in non-built context (bench/spike only).
import '@angular/compiler';
import { PlatformRef } from '@angular/core';
import { performance } from 'perf_hooks';
import {
  BaseSiteResolver,
  BaseSiteResolverConfig,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

export class AngularAppBaseSiteResolver implements BaseSiteResolver {
  protected readonly occBaseUrl: string;
  protected readonly occPrefix: string;
  protected readonly timeoutMs: number;
  protected readonly defaultBaseSite: string | null;
  protected readonly maxConcurrentOccCalls: number;
  /** Renders currently in flight; the basis for the concurrency cap. */
  protected inFlight = 0;

  protected initPromise: Promise<void> | null = null;

  constructor(config: BaseSiteResolverConfig) {
    this.occBaseUrl = config.occBaseUrl;
    this.occPrefix = config.occPrefix ?? '/occ/v2';
    this.timeoutMs = config.timeoutMs ?? 3000;
    this.defaultBaseSite = config.defaultBaseSite ?? null;
    this.maxConcurrentOccCalls = config.maxConcurrentOccCalls ?? 1;
  }

  async initialize(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = (async () => {
        // Warm the platform-server module graph once. renderApplication()
        // creates and destroys its own server platform per resolve() call.
        await import('@angular/platform-server');
        console.log('[create-application] resolver ready (renderApplication per-request)');
      })();
    }
    return this.initPromise;
  }

  async resolve(requestUrl: string): Promise<string | null> {
    await this.initialize();
    // Load shedding: refuse fast before starting a render. Protects the Node
    // process from unbounded concurrent Angular boots and guards the
    // platform-server singleton (two overlapping renders collide). See the
    // config JSDoc for why the default cap is 1.
    if (this.inFlight >= this.maxConcurrentOccCalls) {
      throw new ConcurrencyLimitError();
    }
    this.inFlight++;
    try {
      return await this.resolveViaAngular(requestUrl);
    } finally {
      this.inFlight--;
    }
  }

  async destroy(): Promise<void> {
    this.initPromise = null;
  }

  protected async resolveViaAngular(requestUrl: string): Promise<string | null> {
    const t0 = performance.now();

    const { renderApplication, provideServerRendering, BEFORE_APP_SERIALIZED } =
      await import('@angular/platform-server');
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { provideHttpClient, withFetch } = await import('@angular/common/http');
    const { importProvidersFrom, Component, inject } = await import('@angular/core');
    const { StoreModule } = await import('@ngrx/store');
    const { EffectsModule } = await import('@ngrx/effects');
    // setup → core is a cross-lib dependency, so the core public_api barrel is
    // the supported import path (the circular-dep rule only forbids importing a
    // lib's OWN public_api from inside that lib). Deep 'core/src/...' imports
    // break encapsulation and do not resolve against the published package.
    const {
      SiteContextModule,
      BaseOccModule,
      WindowRef,
      BaseSiteService,
      JavaRegExpConverter,
      provideConfig,
    } = await import('../../../core/public_api');
    const { firstValueFrom } = await import('rxjs');

    // Root component selector must match the host element in the server document
    // passed to renderApplication() below (<app-root>), else NG05104.
    @Component({ selector: 'app-root', standalone: true, template: '' })
    class BaseSiteResolverRootComponent {}

    let capturedSite: string | null = null;

    // renderApplication() passes { platformRef } here as the BootstrapContext
    // (third arg of bootstrapApplication) — required in server mode (NG0401).
    const bootstrap = (context: { platformRef: PlatformRef }) =>
      bootstrapApplication(
        BaseSiteResolverRootComponent,
        {
          providers: [
            provideServerRendering(),
            provideHttpClient(withFetch()),
            importProvidersFrom(
              StoreModule.forRoot({}),
              EffectsModule.forRoot([]),
              SiteContextModule.forRoot(),
              BaseOccModule.forRoot()
            ),
            provideConfig({
              backend: {
                occ: {
                  baseUrl: this.occBaseUrl,
                  prefix: `${this.occPrefix}/`,
                },
              },
            }),
            {
              provide: WindowRef,
              useValue: { location: { href: requestUrl } },
            },
            {
              // Runs after whenStable() and before platform destroy — the only
              // window where the NgRx store is populated and the injector is
              // still alive. Reuses BaseSiteService.getAll() (NgRx Store +
              // Effects → OCC) and JavaRegExpConverter — zero copied logic.
              provide: BEFORE_APP_SERIALIZED,
              multi: true,
              useFactory: () => {
                const baseSiteService = inject(BaseSiteService);
                const regexConverter = inject(JavaRegExpConverter);
                const winRef = inject(WindowRef);
                return async () => {
                  const sites = await firstValueFrom(baseSiteService.getAll());
                  const url = winRef.location.href as string;
                  console.log(
                    `[create-application] baseSites loaded: ${sites?.length}, url=${url}`
                  );
                  const match = sites?.find((s) =>
                    (s.urlPatterns || []).some((p) =>
                      regexConverter.toJsRegExp(p)?.test(url)
                    )
                  );
                  capturedSite = match?.uid ?? this.defaultBaseSite;
                };
              },
            },
          ],
        },
        context
      );

    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const renderPromise = renderApplication(bootstrap, {
        document:
          '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
        url: requestUrl,
        // renderApplication() calls validateAllowedHosts(url, allowedHosts);
        // an empty set rejects every host with NG05706. Spike resolves any URL.
        // NOTE (spike): '*' is unsafe for production — an app must pin the
        // allowed hosts to prevent host-header spoofing.
        allowedHosts: ['*'],
      });

      const timeoutPromise = new Promise<never>((_, reject) => {
        timer = setTimeout(
          () =>
            reject(
              new OccUnavailableError(
                `renderApplication() timed out after ${this.timeoutMs} ms`
              )
            ),
          this.timeoutMs
        );
        // Do not keep the event loop alive solely for this timer.
        timer.unref?.();
      });

      await Promise.race([renderPromise, timeoutPromise]);

      const totalMs = (performance.now() - t0).toFixed(1);
      console.log(
        `[create-application] resolve() done in ${totalMs} ms, site=${capturedSite}`
      );
      return capturedSite;
    } catch (err) {
      const elapsed = (performance.now() - t0).toFixed(1);
      console.error(
        `[create-application] resolve() failed after ${elapsed} ms:`,
        err
      );
      // A render timeout or a render-level throw means we could not resolve —
      // surface it so the Express handler maps to 503 instead of silently
      // serving default content. (A no-match still returns via the try above.)
      if (err instanceof OccUnavailableError) {
        throw err;
      }
      throw new OccUnavailableError(
        `renderApplication() failed after ${elapsed} ms`,
        err
      );
    } finally {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }
}
