import { Category, Price } from '@spartacus/core';
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
