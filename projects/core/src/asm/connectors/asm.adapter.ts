import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;
}
