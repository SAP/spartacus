import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsmUi, AsmUiService } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class AsmService {
  constructor(
    protected store: Store<StateWithAsm>,
    protected asmUiService: AsmUiService
  ) {}

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
    this.asmUiService.updateAsmUiState(asmUi);
  }

  /**
   * Get the state of the ASM UI
   */
  getAsmUiState(): Observable<AsmUi> {
    return this.asmUiService.getAsmUiState();
  }
}
