import { Injectable } from '@angular/core';
import { AsmFacade, CustomerListsPage } from '@spartacus/asm/root';
import { Query, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class AsmQueryService implements AsmFacade {
  protected customerListQuery$: Query<CustomerListsPage> =
    this.queryService.create(() => this.asmConnector.customerLists(), {
      reloadOn: undefined,
      resetOn: undefined,
    });

  constructor(
    protected queryService: QueryService,
    protected asmConnector: AsmConnector
  ) {}

  getCustomerLists(): Observable<QueryState<CustomerListsPage>> {
    return this.customerListQuery$.getState();
  }
}
