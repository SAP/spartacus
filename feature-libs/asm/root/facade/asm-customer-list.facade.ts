import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { CustomerListsPage } from '../model/customer-list.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmCustomerListFacade,
      feature: ASM_FEATURE,
      methods: ['getCustomerLists'],
    }),
})
export abstract class AsmCustomerListFacade {
  abstract getCustomerLists(): Observable<QueryState<CustomerListsPage>>;
}
