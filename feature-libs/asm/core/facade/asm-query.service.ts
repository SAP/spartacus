import { Injectable } from '@angular/core';
import { Command, CommandService, CommandStrategy, Query, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';
import { CustomerListsPage, AsmFacadeService, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';

@Injectable()
export class AsmQueryService implements AsmFacadeService {
  protected customerListQuery$: Query<CustomerListsPage> = this.queryService.create(
    () => this.asmConnector.customerLists(),
    { reloadOn: undefined, resetOn: undefined }
  );

  protected customerSearchCommand$: Command<CustomerSearchOptions, CustomerSearchPage> = this.commandService.create(
    (options: CustomerSearchOptions) => this.asmConnector.customerSearch(options),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected customerSearchQuery$: Query<CustomerSearchPage, [CustomerSearchOptions]> = this.queryService.create(
    (options) => this.asmConnector.customerSearch(options),
    { reloadOn: undefined, resetOn: undefined }
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected asmConnector: AsmConnector
  ) {}

  getCustomerLists(): Observable<QueryState<CustomerListsPage>> {
    return this.customerListQuery$.getState();
  }

  getCustomers(options: CustomerSearchOptions = {}): Observable<CustomerSearchPage> {
    return this.customerSearchCommand$.execute(options);
  }

  getCustomers2(options: CustomerSearchOptions = {}): Observable<QueryState<CustomerSearchPage>> {
    return this.customerSearchQuery$.getState(options);
  }

}
