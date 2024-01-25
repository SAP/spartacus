/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseSiteEffects } from './base-site.effect';
import { CurrenciesEffects } from './currencies.effect';
import { LanguagesEffects } from './languages.effect';

export const effects: any[] = [
  LanguagesEffects,
  CurrenciesEffects,
  BaseSiteEffects,
];

export * from './base-site.effect';
export * from './currencies.effect';
export * from './languages.effect';
