/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseSite, Currency, Language } from '../../model/misc.model';
export const SITE_CONTEXT_FEATURE = 'siteContext';

export interface StateWithSiteContext {
  [SITE_CONTEXT_FEATURE]: SiteContextState;
}

export interface SiteContextState {
  languages: LanguagesState;
  currencies: CurrenciesState;
  baseSite: BaseSiteState;
}

export interface CurrencyEntities {
  [isocode: string]: Currency;
}

export interface CurrenciesState {
  entities: CurrencyEntities | null;
  activeCurrency: string | null;
}
export interface LanguagesEntities {
  [isocode: string]: Language;
}

export interface LanguagesState {
  entities: LanguagesEntities | null;
  activeLanguage: string | null;
}

export interface BaseSiteState {
  entities: BaseSiteEntities | null;
  activeSite: string;
  details: BaseSite;
}

export interface BaseSiteEntities {
  [uid: string]: BaseSite;
}
