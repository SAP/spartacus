/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './product.model';

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
