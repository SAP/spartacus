import {
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Observable } from 'rxjs';

export abstract class AsmAdapter<
  AsmCustomer360Request = any,
  AsmCustomer360Response = any
> {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  abstract bindCart(options: BindCartParams): Observable<unknown>;

  /**
   * Fetches data needed for certain ASM components.
   * @param request that contain information on the specific UI component.
   * @param options with the emulated user's ID.
   */
  abstract getCustomer360Data(
    request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response>;
}
