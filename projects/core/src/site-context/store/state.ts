import { Currency, Language, BaseSite } from '../../model/misc.model';
export const SITE_CONTEXT_FEATURE = 'siteContext';

export interface StateWithSiteContext {
  [SITE_CONTEXT_FEATURE]: SiteContextState;
}

export interface SiteContextState {
  languages: LanguagesState;
  currencies: CurrenciesState;
  baseSite: BaseSiteState;
  baseSites: BaseSitesState;
}

export interface CurrencyEntities {
  [isocode: string]: Currency;
}

export interface CurrenciesState {
  entities: CurrencyEntities;
  activeCurrency: string;
}
export interface LanguagesEntities {
  [isocode: string]: Language;
}

export interface LanguagesState {
  entities: LanguagesEntities;
  activeLanguage: string;
}

export interface BaseSiteEntities {
  [uid: string]: BaseSite;
}

export interface BaseSiteState {
  activeSite: string;
  details: BaseSite;
}

export interface BaseSitesState {
  entities: BaseSiteEntities;
  activeSite: string;
}
