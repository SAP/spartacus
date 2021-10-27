import { Observable } from 'rxjs';
import { OrderEntriesSource } from './import-export.model';
import { ProductData, ProductImportInfo } from './import-to-cart.model';

/**
 * An interface for context which determinate import products destination
 */
export interface AddOrderEntriesContext {
  /**
   * Designates the type of cart that we handle in the context.
   * It allows for recognize used service in better way than instanceof - will works also with overridden services.
   */
  readonly type: OrderEntriesSource;
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
