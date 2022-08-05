import { Injectable } from '@angular/core';
import {
  AsmFacade,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  Query,
  QueryService,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class AsmQueryService implements AsmFacade {
  protected customerListQuery$: Query<CustomerListsPage> =
    this.queryService.create(() => this.asmConnector.customerLists(), {
      reloadOn: undefined,
      resetOn: undefined,
    });

  protected customerSearchCommand$: Command<
    CustomerSearchOptions,
    CustomerSearchPage
  > = this.commandService.create(
    (options: CustomerSearchOptions) =>
      this.asmConnector.customerSearch(options),
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

  getCustomers(
    options: CustomerSearchOptions = {}
  ): Observable<CustomerSearchPage> {
    return this.customerSearchCommand$.execute(options);
  }
}
