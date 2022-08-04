import {
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Observable } from 'rxjs';

export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  /**
   * Used to bind an anonymous cart to a registered user.
   */
  abstract bindCart(options: BindCartParams): Observable<unknown>;
}
