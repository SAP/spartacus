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
   * Command to get real-time stock data for a product.
   */
  protected getRealTimeStockCommand: Command<
    { productCode: string; unitSapCode: string },
    ProductAvailabilities
  > = this.command.create(
    (payload) =>
      this.connector.getRealTimeStock(payload.productCode, payload.unitSapCode),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  /**
   * Executes the command to fetch real-time stock data.
   *
   * @param productCode The product code for which to fetch stock data.
   * @param unitSapCode The SAP code associated with the product.
   * @returns An observable of `ProductAvailabilities`.
   */
  getRealTimeStock(
    productCode: string,
    unitSapCode: string
  ): Observable<ProductAvailabilities> {
    return this.getRealTimeStockCommand.execute({
      productCode,
      unitSapCode,
    });
  }
}
