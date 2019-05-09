import { Address } from './address.model';
import { Image } from './image.model';
import { FeatureUnit, FeatureValue, Stock, Product } from './product.model';
import {
  GeoPoint,
  OpeningSchedule,
  PaginationModel,
  SortModel,
} from './misc.model';
import { Principal, Cart } from './cart.model';
import {
  Breadcrumb,
  Facet,
  SearchState,
  SpellingSuggestion,
} from './product-search.model';

/**
 *
 * An interface representing VariantOptionQualifier.
 */
export interface VariantOptionQualifier {
  /**
   * @member {Image} [image]
   */
  image?: Image;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {string} [qualifier]
   */
  qualifier?: string;
  /**
   * @member {string} [value]
   */
  value?: string;
}

/**
 *
 * An interface representing PromotionRestriction.
 */
export interface PromotionRestriction {
  /**
   * @member {string} [description]
   */
  description?: string;
  /**
   * @member {string} [restrictionType]
   */
  restrictionType?: string;
}

/**
 *
 * An interface representing Feature.
 */
export interface Feature {
  /**
   * @member {string} [code]
   */
  code?: string;
  /**
   * @member {boolean} [comparable]
   */
  comparable?: boolean;
  /**
   * @member {string} [description]
   */
  description?: string;
  /**
   * @member {FeatureUnit} [featureUnit]
   */
  featureUnit?: FeatureUnit;
  /**
   * @member {FeatureValue[]} [featureValues]
   */
  featureValues?: FeatureValue[];
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {boolean} [range]
   */
  range?: boolean;
  /**
   * @member {string} [type]
   */
  type?: string;
}

/**
 *
 * An interface representing VariantCategory.
 */
export interface VariantCategory {
  /**
   * @member {boolean} [hasImage]
   */
  hasImage?: boolean;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {number} [priority]
   */
  priority?: number;
}

/**
 *
 * An interface representing VariantValueCategory.
 */
export interface VariantValueCategory {
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {number} [sequence]
   */
  sequence?: number;
  /**
   * @member {VariantCategory[]} [superCategories]
   */
  superCategories?: VariantCategory[];
}

/**
 *
 * An interface representing CategoryHierarchy.
 */
export interface CategoryHierarchy {
  /**
   * @member {string} [id]
   */
  id?: string;
  /**
   * @member {Date} [lastModified]
   */
  lastModified?: Date;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {CategoryHierarchy[]} [subcategories]
   */
  subcategories?: CategoryHierarchy[];
  /**
   * @member {string} [url]
   */
  url?: string;
}

/**
 *
 * An interface representing CatalogVersion.
 */
export interface CatalogVersion {
  /**
   * @member {CategoryHierarchy[]} [categories]
   */
  categories?: CategoryHierarchy[];
  /**
   * @member {string} [id]
   */
  id?: string;
  /**
   * @member {Date} [lastModified]
   */
  lastModified?: Date;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {string} [url]
   */
  url?: string;
}

/**
 *
 * An interface representing Catalog.
 */
export interface Catalog {
  /**
   * @member {CatalogVersion[]} [catalogVersions]
   */
  catalogVersions?: CatalogVersion[];
  /**
   * @member {string} [id]
   */
  id?: string;
  /**
   * @member {Date} [lastModified]
   */
  lastModified?: Date;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {string} [url]
   */
  url?: string;
}

/**
 *
 * An interface representing CatalogList.
 */
export interface CatalogList {
  /**
   * @member {Catalog[]} [catalogs]
   */
  catalogs?: Catalog[];
}

/**
 *
 * An interface representing Pagination.
 * Pagination info
 *
 */
export interface Pagination {
  /**
   * @member {number} [count] Number of elements on this page
   */
  count?: number;
  /**
   * @member {number} [page] Current page number
   */
  page?: number;
  /**
   * @member {number} [totalCount] Total number of elements
   */
  totalCount?: number;
  /**
   * @member {number} [totalPages] Total number of pages
   */
  totalPages?: number;
}

/**
 *
 * An interface representing Sort.
 * Sort option
 *
 */
export interface Sort {
  /**
   * @member {boolean} [asc]
   */
  asc?: boolean;
  /**
   * @member {string} [code]
   */
  code?: string;
}

/**
 *
 * An interface representing ListAdaptedComponents.
 */
export interface ListAdaptedComponents {
  /**
   * @member {any[]} [components]
   */
  components?: any[];
  /**
   * @member {Pagination} [pagination]
   */
  pagination?: Pagination;
  /**
   * @member {Sort[]} [sorts]
   */
  sorts?: Sort[];
}

/**
 *
 * An interface representing OrderStatusUpdateElement.
 */
export interface OrderStatusUpdateElement {
  /**
   * @member {string} [baseSiteId]
   */
  baseSiteId?: string;
  /**
   * @member {string} [code]
   */
  code?: string;
  /**
   * @member {string} [status]
   */
  status?: string;
}

/**
 *
 * An interface representing PointOfServiceStock.
 */
export interface PointOfServiceStock {
  /**
   * @member {Address} [address]
   */
  address?: Address;
  /**
   * @member {string} [description]
   */
  description?: string;
  /**
   * @member {string} [displayName]
   */
  displayName?: string;
  /**
   * @member {number} [distanceKm]
   */
  distanceKm?: number;
  /**
   * @member {{ [propertyName: string]: string }} [features]
   */
  features?: { [propertyName: string]: string };
  /**
   * @member {string} [formattedDistance]
   */
  formattedDistance?: string;
  /**
   * @member {GeoPoint} [geoPoint]
   */
  geoPoint?: GeoPoint;
  /**
   * @member {Image} [mapIcon]
   */
  mapIcon?: Image;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {OpeningSchedule} [openingHours]
   */
  openingHours?: OpeningSchedule;
  /**
   * @member {Stock} [stockInfo]
   */
  stockInfo?: Stock;
  /**
   * @member {string} [storeContent]
   */
  storeContent?: string;
  /**
   * @member {Image[]} [storeImages]
   */
  storeImages?: Image[];
  /**
   * @member {string} [url]
   */
  url?: string;
}

/**
 *
 * An interface representing ProductExpressUpdateElement.
 */
export interface ProductExpressUpdateElement {
  /**
   * @member {string} [catalogId]
   */
  catalogId?: string;
  /**
   * @member {string} [catalogVersion]
   */
  catalogVersion?: string;
  /**
   * @member {string} [code]
   */
  code?: string;
}

/**
 *
 * An interface representing ProductList.
 */
export interface ProductList {
  /**
   * @member {string} [catalog]
   */
  catalog?: string;
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {Product[]} [products]
   */
  products?: Product[];
  /**
   * @member {number} [totalPageCount]
   */
  totalPageCount?: number;
  /**
   * @member {number} [totalProductCount]
   */
  totalProductCount?: number;
  /**
   * @member {string} [version]
   */
  version?: string;
}

/**
 *
 * An interface representing ProductSearchPage.
 */
export interface ProductSearchPage {
  /**
   * @member {Breadcrumb[]} [breadcrumbs]
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * @member {string} [categoryCode]
   */
  categoryCode?: string;
  /**
   * @member {SearchState} [currentQuery]
   */
  currentQuery?: SearchState;
  /**
   * @member {Facet[]} [facets]
   */
  facets?: Facet[];
  /**
   * @member {string} [freeTextSearch]
   */
  freeTextSearch?: string;
  /**
   * @member {string} [keywordRedirectUrl]
   */
  keywordRedirectUrl?: string;
  /**
   * @member {PaginationModel} [pagination]
   */
  pagination?: PaginationModel;
  /**
   * @member {Product[]} [products]
   */
  products?: Product[];
  /**
   * @member {SortModel[]} [sorts]
   */
  sorts?: SortModel[];
  /**
   * @member {SpellingSuggestion} [spellingSuggestion]
   */
  spellingSuggestion?: SpellingSuggestion;
}

/**
 *
 * An interface representing SaveCartResult.
 */
export interface SaveCartResult {
  /**
   * @member {Cart} [savedCartData]
   */
  savedCartData?: Cart;
}

/**
 *
 * An interface representing StoreFinderStockSearchPage.
 */
export interface StoreFinderStockSearchPage {
  /**
   * @member {number} [boundEastLongitude]
   */
  boundEastLongitude?: number;
  /**
   * @member {number} [boundNorthLatitude]
   */
  boundNorthLatitude?: number;
  /**
   * @member {number} [boundSouthLatitude]
   */
  boundSouthLatitude?: number;
  /**
   * @member {number} [boundWestLongitude]
   */
  boundWestLongitude?: number;
  /**
   * @member {string} [locationText]
   */
  locationText?: string;
  /**
   * @member {PaginationModel} [pagination]
   */
  pagination?: PaginationModel;
  /**
   * @member {Product} [product]
   */
  product?: Product;
  /**
   * @member {SortModel[]} [sorts]
   */
  sorts?: SortModel[];
  /**
   * @member {number} [sourceLatitude]
   */
  sourceLatitude?: number;
  /**
   * @member {number} [sourceLongitude]
   */
  sourceLongitude?: number;
  /**
   * @member {PointOfServiceStock[]} [stores]
   */
  stores?: PointOfServiceStock[];
}

/**
 *
 * An interface representing UserGroup.
 */
export interface UserGroup {
  /**
   * @member {Principal[]} [members]
   */
  members?: Principal[];
  /**
   * @member {number} [membersCount]
   */
  membersCount?: number;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {UserGroup[]} [subGroups]
   */
  subGroups?: UserGroup[];
  /**
   * @member {string} [uid]
   */
  uid?: string;
}

/**
 *
 * An interface representing UserGroupList.
 */
export interface UserGroupList {
  /**
   * @member {number} [currentPage]
   */
  currentPage?: number;
  /**
   * @member {number} [numberOfPages]
   */
  numberOfPages?: number;
  /**
   * @member {number} [pageSize]
   */
  pageSize?: number;
  /**
   * @member {number} [totalNumber]
   */
  totalNumber?: number;
  /**
   * @member {UserGroup[]} [userGroups]
   */
  userGroups?: UserGroup[];
}

/**
 *
 * An interface representing UserSignUp.
 */
export interface UserSignUp {
  /**
   * @member {string} [firstName]
   */
  firstName?: string;
  /**
   * @member {string} [lastName]
   */
  lastName?: string;
  /**
   * @member {string} [password]
   */
  password?: string;
  /**
   * @member {string} [titleCode]
   */
  titleCode?: string;
  /**
   * @member {string} [uid]
   */
  uid?: string;
}
