import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CustomerListsPage } from '@spartacus/asm/root';
import { ASM_FEATURE } from '@spartacus/asm/root';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
  facadeFactory({
    facade: AsmFacadeService,
    feature: ASM_FEATURE,
    methods: [
      'getCustomerLists',
    ],
  }),

})
export abstract class AsmFacadeService {

  abstract getCustomerLists(): Observable<QueryState<CustomerListsPage>>;
}
