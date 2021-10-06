import { Category, Price } from '@spartacus/core';
import { PageEvent } from '../page/page.events';

/**
 * Indicates that a user visited a product details page.
 */
export class ProductDetailsPageEvent extends PageEvent {
  /** event's type */
  static readonly type = 'ProductDetailsPageEvent';
  categories?: Category[];
  code?: string;
  name?: string;
  price?: Price;
}

/**
 * Indicates that a user visited a category page.
 */
export class CategoryPageResultsEvent extends PageEvent {
  /** event's type */
  static readonly type = 'CategoryPageResultsEvent';
  categoryCode: string;
  categoryName?: string;
  numberOfResults: Number;
}

/**
 * Indicates that the a user visited the search results page,
 * and that the search results have been retrieved.
 */
export class SearchPageResultsEvent extends PageEvent {
  /** event's type */
  static readonly type = 'SearchPageResultsEvent';
  searchTerm: string;
  numberOfResults: Number;
}
