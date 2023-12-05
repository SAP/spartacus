import { PaginationModel, SortModel } from './misc.model';
import { Product } from './product.model';
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
    values?: FacetValue[];
    visible?: boolean;
    /**
     * Indicates whether the facet group is expanded in the UI. An expanded
     * does not necessarily show all facet value at once, this can be limited
     * by the so-called `topValueCount`.
     */
    expanded?: boolean;
    /**
     * Indicates the top values that will be shown instantly. The top values can be
     * controlled by business users per facet.
     */
    topValueCount?: number;
    /**
     * The OCC backend has topValues with duplicated facet data.
     * This is not used in the UI, but normalized in the `topValueCount` property.
     */
    topValues?: FacetValue[];
}
export interface SpellingSuggestion {
    query?: string;
    suggestion?: string;
}
export interface ProductSearchPage {
    breadcrumbs?: Breadcrumb[];
    categoryCode?: string;
    currentQuery?: SearchState;
    facets?: Facet[];
    freeTextSearch?: string;
    keywordRedirectUrl?: string;
    pagination?: PaginationModel;
    products?: Product[];
    sorts?: SortModel[];
    spellingSuggestion?: SpellingSuggestion;
}
export interface Suggestion {
    value?: string;
}
export interface ClearSearch {
    clearPageResults?: boolean;
    clearSearchboxResults?: boolean;
}
