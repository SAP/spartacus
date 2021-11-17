import { Image, Images } from './image.model';
import { User } from './misc.model';

export interface VariantOptionQualifier {
  image?: Image;
  name?: string;
  qualifier?: VariantQualifier;
  value?: string;
}

export interface PromotionRestriction {
  description?: string;
  restrictionType?: string;
}

export interface FeatureUnit {
  name?: string;
  symbol?: string;
  unitType?: string;
}

export interface FeatureValue {
  value?: string;
}

export interface Feature {
  code?: string;
  comparable?: boolean;
  description?: string;
  featureUnit?: FeatureUnit;
  featureValues?: FeatureValue[];
  name?: string;
  range?: boolean;
  type?: string;
}

export interface VariantCategory {
  hasImage?: boolean;
  name?: string;
  priority?: number;
}

export interface VariantValueCategory {
  name?: string;
  sequence?: number;
  superCategories?: VariantCategory[];
}

export enum VariantType {
  SIZE = 'ApparelSizeVariantProduct',
  STYLE = 'ApparelStyleVariantProduct',
  COLOR = 'ElectronicsColorVariantProduct',
}

export enum PriceType {
  BUY = 'BUY',
  FROM = 'FROM',
}

export interface Price {
  currencyIso?: string;
  formattedValue?: string;
  maxQuantity?: number;
  minQuantity?: number;
  priceType?: PriceType;
  value?: number;
}

export interface Stock {
  isValueRounded?: boolean;
  stockLevel?: number;
  stockLevelStatus?: string;
}

export interface VariantOption {
  code?: string;
  priceData?: Price;
  stock?: Stock;
  url?: string;
  variantOptionQualifiers?: VariantOptionQualifier[];
}

export interface Promotion {
  code?: string;
  couldFireMessages?: string[];
  description?: string;
  enabled?: boolean;
  endDate?: Date;
  firedMessages?: string[];
  priority?: number;
  productBanner?: Image;
  promotionGroup?: string;
  promotionType?: string;
  restrictions?: PromotionRestriction[];
  startDate?: Date;
  title?: string;
}

export interface Category {
  code?: string;
  name?: string;
  image?: Image;
  url?: string;
}

export interface Classification {
  code?: string;
  features?: Feature[];
  name?: string;
}

export interface FutureStock {
  date?: Date;
  formattedDate?: string;
  stock?: Stock;
}

export interface PriceRange {
  maxPrice?: Price;
  minPrice?: Price;
}

export interface ProductReference {
  description?: string;
  preselected?: boolean;
  quantity?: number;
  referenceType?: string;
  target?: Product;
}

export interface Review {
  alias?: string;
  comment?: string;
  date?: Date;
  headline?: string;
  id?: string;
  principal?: User;
  rating?: number;
}

export interface VariantMatrixElement {
  elements?: VariantMatrixElement[];
  isLeaf?: boolean;
  parentVariantCategory?: VariantCategory;
  variantOption?: VariantOption;
  variantValueCategory?: VariantValueCategory;
}

export interface ProductReferences {
  [referenceType: string]: ProductReference[];
}

export interface BaseOption {
  options?: VariantOption[];
  selected?: VariantOption;
  variantType?: VariantType;
}

export interface Product {
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
  /**
   * The product slug is used to create pretty URL for links to product detail pages.
   *
   * The slug typically avoid spaces (`%20`) or other characters that are encoded in the URL.
   */
  slug?: string;
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

export enum VariantQualifier {
  SIZE = 'size',
  STYLE = 'style',
  COLOR = 'color',
  THUMBNAIL = 'thumbnail',
  PRODUCT = 'product',
  ROLLUP_PROPERTY = 'rollupProperty',
}
