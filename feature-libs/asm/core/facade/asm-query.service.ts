import { Injectable } from '@angular/core';
import { QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import { CustomerListsPage } from '../models/asm.models';

@Injectable({
  providedIn: 'root',
})
export class AsmQueryService {
  protected customerListQuery$ = this.queryService.create(
    () => this.asmConnector.customerLists(),
    { reloadOn: undefined, resetOn: undefined }
  );

  constructor(
    protected queryService: QueryService,
    protected asmConnector: AsmConnector
  ) {}

  getCustomerLists(): Observable<QueryState<CustomerListsPage>> {
    return this.customerListQuery$.getState();
  }
}
