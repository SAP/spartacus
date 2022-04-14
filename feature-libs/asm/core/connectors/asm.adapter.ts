import { Observable } from 'rxjs';
import {
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';

export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  /**
   * Abstract function used to get customer lists.
   */
  abstract customerLists(): Observable<CustomerListsPage>;
}
