import { Currency, Language } from '../../occ-models/occ.models';
export const SITE_CONTEXT_FEATURE = 'siteContext';

export interface StateWithSiteContext {
  [SITE_CONTEXT_FEATURE]: SiteContextState;
}

export interface SiteContextState {
  languages: LanguagesState;
  currencies: CurrenciesState;
}

export interface CurrencyEntities {
  [isocode: string]: Currency;
}

export interface CurrenciesState {
  entities: CurrencyEntities;
  activeCurrency: string;
}
export interface LanguagesEntities {
  [isocode: string]: Language[];
}

export interface LanguagesState {
  entities: LanguagesEntities;
  activeLanguage: string;
}
