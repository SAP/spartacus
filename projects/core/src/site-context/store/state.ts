import { Currency, Language } from '../../occ/occ-models/occ.models';
import { LoaderState } from '../../store-entities/loader-state';
export const SITE_CONTEXT_FEATURE = 'siteContext';

export interface StateWithSiteContext {
  [SITE_CONTEXT_FEATURE]: SiteContextState;
}

export interface SiteContextState {
  languages: LanguagesState;
  currencies: LoaderState<CurrenciesState>;
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
