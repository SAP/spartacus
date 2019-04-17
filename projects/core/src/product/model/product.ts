import {
  BaseOption,
  Category,
  Classification,
  FutureStock,
  Image,
  Price,
  PriceRange,
  ProductReference,
  Promotion,
  Review,
  Stock,
  VariantMatrixElement,
  VariantOption,
} from '../../occ/occ-models/occ.models';

export interface UIImages {
  [imageType: string]: UIImage | UIImage[];
}

export interface UIImage {
  [format: string]: Image;
}

export interface UIProductReferences {
  [referenceType: string]: ProductReference[];
}

export interface UIProduct {
  availableForPickup?: boolean;
  averageRating?: number;
  baseOptions?: BaseOption[];
  baseProduct?: string;
  categories?: Category[];
  classifications?: Classification[];
  code?: string;
  description?: string;
  futureStocks?: FutureStock[];
  images?: UIImages;
  manufacturer?: string;
  multidimensional?: boolean;
  name?: string;
  numberOfReviews?: number;
  potentialPromotions?: Promotion[];
  price?: Price;
  priceRange?: PriceRange;
  productReferences?: UIProductReferences;
  purchasable?: boolean;
  reviews?: Review[];
  stock?: Stock;
  summary?: string;
  url?: string;
  variantMatrix?: VariantMatrixElement[];
  variantOptions?: VariantOption[];
  variantType?: string;
  volumePrices?: Price[];
  volumePricesFlag?: boolean;
}
