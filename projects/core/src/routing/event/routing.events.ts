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

export class PageVisitedEvent {}

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisitedEvent extends PageVisitedEvent
  implements Product {
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
 * A visited category / brand code value is emited whenever one of the pages is visited.
 */
export class CategoryPageVisitedEvent extends PageVisitedEvent {}
/**
 * Indicates that a user changed category-related facets.
 * All the category facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class CategoryFacetChangeEvent extends PageVisitedEvent {}
/**
 * Indicates that a user changed brand-related facets.
 * All the brand facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class BrandFacetChangeEvent extends PageVisitedEvent {}

export class SearchResultsChangeEvent extends PageVisitedEvent {
  searchTerm: string;
  numberOfResults: Number;
}
