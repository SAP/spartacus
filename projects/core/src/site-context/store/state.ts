export const SITE_CONTEXT_FEATURE = 'siteContext';

export interface StateWithSiteContext {
  [SITE_CONTEXT_FEATURE]: SiteContextState;
}

export interface SiteContextState {
  languages: LanguagesState;
  currencies: CurrenciesState;
}

export interface CurrencyEntities {
  [isocode: string]: any;
}

export interface CurrenciesState {
  entities: CurrencyEntities;
  loadAttempted: boolean;
  loading: boolean;
  activeCurrency: string;
}
export interface LanguagesEntities {
  [isocode: string]: any;
}

export interface LanguagesState {
  entities: LanguagesEntities;
  loadAttempted: boolean;
  loading: boolean;
  activeLanguage: string;
}
