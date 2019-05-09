import { UIProduct } from './product.model';
import { PaginationModel, SortModel } from './misc.model';

export interface SearchQuery {
  value?: string;
}

export interface SearchState {
  query?: SearchQuery;
  url?: string;
}

export interface FacetValue {
  count?: number;
  name?: string;
  query?: SearchState;
  selected?: boolean;
}

export interface Breadcrumb {
  facetCode?: string;
  facetName?: string;
  facetValueCode?: string;
  facetValueName?: string;
  removeQuery?: SearchState;
  truncateQuery?: SearchState;
}

export interface Facet {
  category?: boolean;
  multiSelect?: boolean;
  name?: string;
  priority?: number;
  topValues?: FacetValue[];
  values?: FacetValue[];
  visible?: boolean;
}

export interface SpellingSuggestion {
  query?: string;
  suggestion?: string;
}

export interface UIProductSearchPage {
  breadcrumbs?: Breadcrumb[];
  categoryCode?: string;
  currentQuery?: SearchState;
  facets?: Facet[];
  freeTextSearch?: string;
  keywordRedirectUrl?: string;
  pagination?: PaginationModel;
  products?: UIProduct[];
  sorts?: SortModel[];
  spellingSuggestion?: SpellingSuggestion;
}

export interface Suggestion {
  value?: string;
}
