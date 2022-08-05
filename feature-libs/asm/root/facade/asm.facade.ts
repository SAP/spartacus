import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { CustomerListsPage } from '../model/customer-list.model';
import { CustomerSearchOptions } from '../model/customer-search-options.model';
import { CustomerSearchPage } from '../model/customer-search-page.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmFacade,
      feature: ASM_FEATURE,
      methods: ['getCustomerLists', 'getCustomers'],
    }),
})
export abstract class AsmFacade {
  abstract getCustomerLists(): Observable<QueryState<CustomerListsPage>>;

  abstract getCustomers(
    options?: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;
}
