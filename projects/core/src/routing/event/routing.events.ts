import { Category, Price } from '../../model/product.model';

/**
 * Indicates that a user visited the home page of a web presence.
 */
export class HomePageVisited {}

/**
 * Indicates that a user visited a cart page.
 */
export class CartPageVisited {}

/**
 * Indicates that a user visited an order confirmation page.
 */
export class OrderConfirmationPageVisited {}

/**
 * Indicates either that a user visited an arbitrary page of a web presence or that the page type was unknown.
 */
export class PageVisited {}

/**
 * Indicates that a user visited a product details page. A visited product code value is emitted whenever the product 
 * details page is visited, together with the name, the price, and the categories of that product.
 */
export class ProductDetailsPageVisited {
  categories?: Category[];
  code?: string;
  name?: string;
  price?: Price;
}

/**
 * Indicates that a user visited a category or brand page. The code and the name of the category are emitted whenever 
 * a category page is visited.
 */
export class CategoryPageVisited {
  categoryCode: string;
  categoryName: string;
}

/**
 * Indicates that a user visited a keyword search page. The search term and the number of results are emitted whenever 
 * a keyword search has been executed.
 */
export class KeywordSearchPageVisited {
  searchTerm: string;
  numberOfResults: Number;
}
