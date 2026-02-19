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
