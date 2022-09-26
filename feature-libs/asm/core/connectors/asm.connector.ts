import { Injectable } from '@angular/core';
import {
  AsmCustomer360Params,
  AsmCustomer360Query,
  AsmCustomer360Response,
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Observable } from 'rxjs';

import { AsmAdapter } from './asm.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmConnector {
  constructor(protected asmAdapter: AsmAdapter) {}

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return this.asmAdapter.customerSearch(options);
  }

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.asmAdapter.bindCart(options);
  }

  getCustomer360Data(
    queries: Array<AsmCustomer360Query>,
    options: AsmCustomer360Params
  ): Observable<AsmCustomer360Response> {
    return this.asmAdapter.getCustomer360Data(queries, options);
  }
}
