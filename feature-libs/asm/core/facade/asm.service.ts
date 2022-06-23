import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AsmFacade,
  AsmUi,
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/index';

@Injectable()
export class AsmService implements AsmFacade {
  constructor(
    protected store: Store<StateWithAsm>,
    protected commandService: CommandService,
    protected asmConnector: AsmConnector
  ) {}

  protected bindCartCommand$: Command<BindCartParams> =
    this.commandService.create((options: BindCartParams) =>
      this.asmConnector.bindCart(options)
    );

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

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.bindCartCommand$.execute(options);
  }
}
