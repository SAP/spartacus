import { Images } from '../../model';
import {
  BaseOption,
  Category,
  Classification,
  FutureStock,
  Price,
  PriceRange,
  Product,
  ProductReferences,
  Promotion,
  Review,
  Stock,
  VariantMatrixElement,
  VariantOption,
  VariantType,
} from '../../model/product.model';

export class PageVisited {}
export class HomePageVisited extends PageVisited {}
export class CartPageVisited extends PageVisited {}
export class OrderConfirmationPageVisited extends PageVisited {}

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisited extends PageVisited implements Product {
  availableForPickup?: boolean;
  averageRating?: number;
  baseOptions?: BaseOption[];
  baseProduct?: string;
  categories?: Category[];
  classifications?: Classification[];
  code?: string;
  description?: string;
  futureStocks?: FutureStock[];
  images?: Images;
  manufacturer?: string;
  multidimensional?: boolean;
  name?: string;
  nameHtml?: string;
  numberOfReviews?: number;
  potentialPromotions?: Promotion[];
  price?: Price;
  priceRange?: PriceRange;
  productReferences?: ProductReferences;
  purchasable?: boolean;
  reviews?: Review[];
  stock?: Stock;
  summary?: string;
  url?: string;
  variantMatrix?: VariantMatrixElement[];
  variantOptions?: VariantOption[];
  variantType?: VariantType;
  volumePrices?: Price[];
  volumePricesFlag?: boolean;
}
/**
 * Indicates that a user visited a category or brand page.
 */
export class CategoryPageVisited extends PageVisited {
  categoryCode: string;
  categoryName: string;
}

export class KeywordSearchPageVisited extends PageVisited {
  searchTerm: string;
  numberOfResults: Number;
}
