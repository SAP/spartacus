import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  AsmUi,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmFacadeService, CustomerListsPage } from '@spartacus/asm/root';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class AsmService {
  constructor(
    protected store: Store<StateWithAsm>,
    protected asmFacadeService: AsmFacadeService
  ) {}

  getCustomerLists2(): Observable<QueryState<CustomerListsPage>> {
    return this.asmFacadeService.getCustomerLists();
    // return NEVER;
  }

  searchCustomerLists(): void {
    this.store.dispatch(new AsmActions.CustomerLists());
  }

  getCustomerLists(): Observable<CustomerListsPage> {
    return this.store.pipe(select(AsmSelectors.getCustomerListResult));
  }

  /**
   * Search for customers
   * @param options
   */
  customerSearch(options: CustomerSearchOptions): void {
    this.store.dispatch(new AsmActions.CustomerSearch(options));
  }

  /**
   * Reset the customer search result data to the initial state.
   */
  customerSearchReset(): void {
    this.store.dispatch(new AsmActions.CustomerSearchReset());
  }

  /**
   * Returns the customer search result data.
   */
  getCustomerSearchResults(): Observable<CustomerSearchPage> {
    return this.store.pipe(select(AsmSelectors.getCustomerSearchResults));
  }

  /**
   * Returns the customer search result loading status.
   */
  getCustomerSearchResultsLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerSearchResultsLoading)
    );
  }

  /**
   * Updates the state of the ASM UI
   */
  updateAsmUiState(asmUi: AsmUi): void {
    this.store.dispatch(new AsmActions.AsmUiUpdate(asmUi));
  }

  /**
   * Get the state of the ASM UI
   */
  getAsmUiState(): Observable<AsmUi> {
    return this.store.pipe(select(AsmSelectors.getAsmUi));
  }
}
