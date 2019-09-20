import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';

export abstract class CustomerAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract search(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;
}
