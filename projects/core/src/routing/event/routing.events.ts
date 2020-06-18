import { Category, Price } from '../../model/product.model';

export class HomePageVisited {}
export class CartPageVisited {}
export class OrderConfirmationPageVisited {}
export class PageVisited {}

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisited {
  categories?: Category[];
  code?: string;
  name?: string;
  price?: Price;
}
/**
 * Indicates that a user visited a category or brand page.
 */
export class CategoryPageVisited {
  categoryCode: string;
  categoryName: string;
}

export class KeywordSearchPageVisited {
  searchTerm: string;
  numberOfResults: Number;
}
