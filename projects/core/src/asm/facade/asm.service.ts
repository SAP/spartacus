import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';

@Injectable({
  providedIn: 'root',
})
export class AsmService {
  constructor(protected store: Store<StateWithAsm>) {}

  /**
   * Loads a new user token
   * @param userId
   */
  customerSearch(searchTerm: string): void {
    console.log('ASM facade customerSearch', searchTerm);
    this.store.dispatch(
      new CustomerActions.CustomerSearch({
        searchTerm,
      })
    );
  }
}
