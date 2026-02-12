/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, Provider } from '@angular/core';
import { BaseSiteInitializer } from '../services/base-site-initializer';
import { CurrencyInitializer } from '../services/currency-initializer';
import { LanguageInitializer } from '../services/language-initializer';

export function initializeCurrency(
  currencyInitializer: CurrencyInitializer
): () => void {
  return () => {
    currencyInitializer.initialize();
  };
}

export function initializeLanguage(
  languageInitializer: LanguageInitializer
): () => void {
  return () => {
    languageInitializer.initialize();
  };
}

export function initializeBaseSite(
  baseSiteInitializer: BaseSiteInitializer
): () => void {
  return () => {
    baseSiteInitializer.initialize();
  };
}

/**
 * Context initializer providers for the core site contexts.
 *
 * Note on Custom Contexts:
 * ------------------------
 * Custom contexts that are **derived** from another context (like CustomContextService
 * which wraps LanguageService) do NOT need their own initializer because:
 *
 * 1. `SiteContextRoutesHandler.initOnce()` handles ALL URL parameters globally,
 *    including custom ones - it reads from URL and calls `setValue()` for each context.
 *
 * 2. For derived contexts (e.g., uppercase language), the underlying context
 *    (LanguageService) is already initialized by LanguageInitializer.
 *
 * 3. The derived context's `getActive()` automatically reflects the underlying value.
 *
 * A custom initializer is only needed when:
 * - The custom context has its own independent state (not derived from another context)
 * - The custom context needs special persistence (like LanguageStatePersistenceService)
 * - The custom context needs custom fallback logic different from URL extraction
 */
export const contextInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeLanguage,
    deps: [LanguageInitializer],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeCurrency,
    deps: [CurrencyInitializer],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeBaseSite,
    deps: [BaseSiteInitializer],
    multi: true,
  },
];
