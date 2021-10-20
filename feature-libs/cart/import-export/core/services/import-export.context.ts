import { Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { CartTypes } from '../model/import-export.model';
import { ProductData, ProductImportInfo } from '../model/import-to-cart.model';

/**
 * An interface for context which determinate import products destination and export products source
 */
export interface ImportExportContext {
  /**
   * Designates the type of cart that we handle in the context.
   * It allows for recognize used service in better way than instanceof - will works also with overridden services.
   */
  readonly type: CartTypes;

  /**
   * Retrieve order entries from context source for export action.
   *
   * @returns {Observable<OrderEntry[]>}
   */
  getEntries(): Observable<OrderEntry[]>;

  /**
   * Process products data to import destination.
   *
   * @param { ProductData[] } products
   * @param {{ name: string; description: string }} [savedCartInfo] information necessary to create new saved cart
   * @returns {Observable<ProductImportInfo>} information for summary
   */
  addEntries(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo>;
}
