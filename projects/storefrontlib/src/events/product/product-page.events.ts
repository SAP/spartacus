import {
  Breadcrumb,
  Category,
  Facet,
  FacetValue,
  Price,
} from '@spartacus/core';
import { PageEvent } from '../page/page.events';

/**
 * Indicates that a user visited a product details page.
 */
export class ProductDetailsPageEvent extends PageEvent {
  categories?: Category[];
  code?: string;
  name?: string;
  price?: Price;
}

/**
 * Indicates that a user visited a category page.
 */
export class CategoryPageResultsEvent extends PageEvent {
  categoryCode: string;
  categoryName?: string;
  numberOfResults: Number;
}

/**
 * Indicates that the a user visited the search results page,
 * and that the search results have been retrieved.
 */
export class SearchPageResultsEvent extends PageEvent {
  searchTerm: string;
  numberOfResults: Number;
}

/**
 * Indicates that a user get or click a facet
 */
export class FacetChangedEvent extends PageEvent {
  appliedFacets: Breadcrumb[];
  toggledFacet?: {
    facet: Facet;
    state: {
      value: FacetValue;
      toggled: FacetValueToggledState;
    };
  };
}

export enum FacetValueToggledState {
  TOGGLED_ON = 'TOGGLED_ON',
  TOGGLED_OFF = 'TOGGLED_OFF',
}
