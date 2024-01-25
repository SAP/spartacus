/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stock, StoreFinderStockSearchPage } from '@spartacus/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

/**
 * Adapter for finding stock levels of a product in stores.
 */
export abstract class StockAdapter {
  /**
   * Finds stock levels of a product at stores near a location.
   * @param productCode the product code of the product to find stock levels for
   * @param location the location to find stock levels at, either lat long or free text search
   */
  abstract loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage>;

  /**
   * Finds stock levels of a product at an individual store.
   * @param productCode the product code of the product to find stock levels for
   * @param storeName the name of the store to find stock levels at
   */
  abstract loadStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock>;
}
