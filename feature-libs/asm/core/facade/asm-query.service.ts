import { Injectable } from '@angular/core';
import { Command, CommandService, CommandStrategy, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import { CustomerListsPage } from '@spartacus/asm/root';
import { AsmFacadeService, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';

@Injectable()
export class AsmQueryService implements AsmFacadeService {
  protected customerListQuery$ = this.queryService.create(
    () => this.asmConnector.customerLists(),
    { reloadOn: undefined, resetOn: undefined }
  );

  protected customerSearchCommand$: Command<CustomerSearchOptions, CustomerSearchPage> = this.commandService.create(
    (options: CustomerSearchOptions) => this.asmConnector.customerSearch(options),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
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

}
