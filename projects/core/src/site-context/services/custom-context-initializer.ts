/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CUSTOM } from '../providers/context-ids';
import { CustomContextService } from './custom-context-service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

/**
 * Custom Context Initializer - EXAMPLE/REFERENCE IMPLEMENTATION
 *
 * IMPORTANT: This initializer is NOT needed for the current `CustomContextService`
 * because it's a **derived context** that wraps `LanguageService`.
 *
 * ## Two Types of Custom Contexts:
 *
 * ### 1. Derived Contexts (like CustomContextService)
 * - Wraps another context (e.g., uppercase wrapper around LanguageService)
 * - `getActive()` derives from the underlying service
 * - `setActive()` delegates to the underlying service
 * - **NO initializer needed** because:
 *   - `SiteContextRoutesHandler.initOnce()` handles URL synchronization
 *   - The underlying context (Language) is already initialized
 *   - The derived context automatically reflects the underlying value
 *
 * ### 2. Independent Contexts (requires initializer)
 * - Has its own state (not derived from another context)
 * - Stores value in its own store/state
 * - **Needs initializer** for:
 *   - Setting fallback value from config
 *   - Custom persistence (like session storage)
 *   - Special initialization logic
 *
 * ## Why `initOnce()` Works Without Parameters:
 *
 * The `SiteContextRoutesHandler.initOnce()` method:
 * 1. Reads ALL `urlParameters` from config (including 'custom')
 * 2. Extracts ALL context values from URL at once
 * 3. Calls `setValue()` for each context via `ContextServiceMap`
 * 4. Is idempotent - safe to call from multiple initializers
 *
 * So for the current `CustomContextService` (derived context):
 * - When user visits `/EN/USD/electronics-spa`
 * - `initOnce()` extracts `custom: 'EN'` from URL
 * - Calls `CustomContextService.setActive('EN')`
 * - Which calls `LanguageService.setActive('en')`
 * - But `LanguageInitializer` already set language from URL!
 * - So this is redundant for derived contexts.
 *
 * This class is kept as a REFERENCE for customers who need to implement
 * initializers for independent custom contexts.
 */
@Injectable({ providedIn: 'root' })
export class CustomContextInitializer implements OnDestroy {
  protected siteContextRoutesHandler = inject(SiteContextRoutesHandler);
  protected customContextService: CustomContextService =
    inject(CustomContextService);
  protected configInit: ConfigInitializerService = inject(ConfigInitializerService);

  protected subscription: Subscription;

  /**
   * Initializes the value of the custom context.
   *
   * NOTE: For derived contexts (like CustomContextService which wraps LanguageService),
   * this initialization is redundant because the underlying context is already
   * initialized and the derived context reflects it automatically.
   *
   * This method is useful for INDEPENDENT custom contexts that have their own state.
   *
   * @returns Observable that completes when initialization is done.
   */
  initialize(): Observable<unknown> {
    const init$ = this.configInit.getStable('context').pipe(
      // initOnce() handles ALL URL parameters globally.
      // For derived contexts, this is redundant but harmless.
      switchMap(() => this.siteContextRoutesHandler.initOnce()),
      switchMap(() => this.setFallbackValue())
    );

    this.subscription = init$.subscribe();
    return init$;
  }

  /**
   * Sets the default value taken from config.
   *
   * NOTE: For derived contexts, this may cause unexpected behavior because
   * it overwrites the value that was already set via the underlying context.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  protected setDefaultFromConfig(config: SiteContextConfig): void {
    const contextParam = getContextParameterDefault(config, CUSTOM);
    if (contextParam) {
      // WARNING: For derived contexts, this delegates to the underlying service
      // (e.g., LanguageService.setActive('en')), which may overwrite a value
      // that was already correctly initialized from the URL.
      this.customContextService.setActive(contextParam);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

