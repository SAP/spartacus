import {
  AsmCustomer360Params,
  AsmCustomer360Response,
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { AsmCustomer360Query } from '@spartacus/asm/root';
import { Observable } from 'rxjs';

export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  abstract bindCart(options: BindCartParams): Observable<unknown>;

  abstract getCustomer360Data(
    queries: Array<AsmCustomer360Query>,
    options: AsmCustomer360Params
  ): Observable<AsmCustomer360Response>;
}
