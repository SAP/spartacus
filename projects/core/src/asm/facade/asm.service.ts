import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerSearchPage } from '../models/asm.models';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class AsmService {
  constructor(protected store: Store<StateWithAsm>) {}

  /**
   * search for customers
   * @param searchTerm
   */
  customerSearch(searchTerm: string): void {
    this.store.dispatch(
      new AsmActions.CustomerSearch({
        searchTerm,
      })
    );
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
  getCustomerSearchResult(): Observable<CustomerSearchPage> {
    return this.store.pipe(select(AsmSelectors.getCustomerSearchResults));
  }
}
