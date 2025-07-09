/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Command,
  CommandService,
  CommandStrategy,
} from '../../../src/util/command-query';
import { ProductAvailabilities } from '../../model/product.model';
import { ProductAvailabilityConnector } from '../connectors';

/**
 * The `ProductAvailabilityService` is responsible for fetching the latest real-time stock
 * information for products. Unlike the stock information provided by the `ProductService`,
 * which might be cached, this service ensures that you receive fresh data directly
 * from the backend.
 */

@Injectable({
  providedIn: 'root',
})
export class ProductAvailabilityService {
  protected connector = inject(ProductAvailabilityConnector);
  protected command = inject(CommandService);

  /**
   * Command to get real-time stock data for one or more products.
   */
  protected getRealTimeStockCommand: Command<
    { productCode: string; unitCode: string }[],
    ProductAvailabilities
  > = this.command.create(
    (payload) => this.connector.getRealTimeStock(payload),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  /**
   * Executes the command to fetch real-time stock data for multiple products.
   *
   * @param productUnitPairs Array of { productCode, unitCode }
   * @returns An observable of `ProductAvailabilities`.
   */
  getRealTimeStock(
    productUnitPairs: { productCode: string; unitCode: string }[]
  ): Observable<ProductAvailabilities> {
    return this.getRealTimeStockCommand.execute(productUnitPairs);
  }
}
