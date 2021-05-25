import { Address } from './address.model';
import { Image } from './image.model';
import { Product, Stock } from './product.model';
import { GeoPoint, PaginationModel, SortModel } from './misc.model';
import { Cart } from './cart.model';
import { OpeningSchedule } from './point-of-service.model';

export interface CategoryHierarchy {
  id?: string;
  lastModified?: Date;
  name?: string;
  subcategories?: CategoryHierarchy[];
  url?: string;
}

export interface CatalogVersion {
  categories?: CategoryHierarchy[];
  id?: string;
  lastModified?: Date;
  name?: string;
  url?: string;
}

export interface Catalog {
  catalogVersions?: CatalogVersion[];
  id?: string;
  lastModified?: Date;
  name?: string;
  url?: string;
}

export interface Pagination {
  count?: number;
  page?: number;
  totalCount?: number;
  totalPages?: number;
}

export interface Sort {
  asc?: boolean;
  code?: string;
}

export interface ListAdaptedComponents {
  components?: any[];
  pagination?: Pagination;
  sorts?: Sort[];
}

export interface OrderStatusUpdateElement {
  baseSiteId?: string;
  code?: string;
  status?: string;
}

export interface PointOfServiceStock {
  address?: Address;
  description?: string;
  displayName?: string;
  distanceKm?: number;
  features?: { [propertyName: string]: string };
  formattedDistance?: string;
  geoPoint?: GeoPoint;
  mapIcon?: Image;
  name?: string;
  openingHours?: OpeningSchedule;
  stockInfo?: Stock;
  storeContent?: string;
  storeImages?: Image[];
  url?: string;
}

export interface ProductExpressUpdateElement {
  catalogId?: string;
  catalogVersion?: string;
  code?: string;
}

export interface ProductList {
  catalog?: string;
  currentPage?: number;
  products?: Product[];
  totalPageCount?: number;
  totalProductCount?: number;
  version?: string;
}

export interface SaveCartResult {
  savedCartData?: Cart;
}

export interface StoreFinderStockSearchPage {
  boundEastLongitude?: number;
  boundSouthLatitude?: number;
  boundWestLongitude?: number;
  locationText?: string;
  pagination?: PaginationModel;
  product?: Product;
  sorts?: SortModel[];
  sourceLatitude?: number;
  sourceLongitude?: number;
  stores?: PointOfServiceStock[];
}
