import { Category, Price } from '@spartacus/core';

/**
 * Indicates that a user visited a product details page.
 */
export class ProductDetailsPageEvent {
  categories?: Category[];
  code?: string;
  name?: string;
  price?: Price;
}

/**
 * Indicates that a user visited a category page.
 */
export class CategoryPageResultsEvent {
  categoryCode: string;
  categoryName: string;
}

/**
 * Indicates that the a user visited the search results page,
 * and that the search results have been retrieved.
 */
export class SearchPageResultsEvent {
  searchTerm: string;
  numberOfResults: Number;
}
