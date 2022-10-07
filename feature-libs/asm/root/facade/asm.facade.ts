import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import {
  AsmCustomer360Params,
  AsmCustomer360Query,
  AsmCustomer360Response,
} from '../model';
import {
  AsmUi,
  BindCartParams,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../model/asm.models';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmFacade,
      feature: ASM_FEATURE,
      methods: [
        'bindCart',
        'customerSearch',
        'customerSearchReset',
        'getCustomerSearchResults',
        'getCustomerSearchResultsLoading',
        'updateAsmUiState',
        'getAsmUiState',
        'fetchCustomer360Data',
        'getCustomer360Data',
      ],
    }),
})
export abstract class AsmFacade {
  /**
   * Bind an anonymous cart to customer
   * @param options
   */
  abstract bindCart(options: BindCartParams): Observable<unknown>;

  /**
   * Search for customers
   * @param options
   */
  abstract customerSearch(options: CustomerSearchOptions): void;

  /**
   * Reset the customer search result data to the initial state.
   */
  abstract customerSearchReset(): void;

  /**
   * Returns the customer search result data.
   */
  abstract getCustomerSearchResults(): Observable<CustomerSearchPage>;

  /**
   * Returns the customer search result loading status.
   */
  abstract getCustomerSearchResultsLoading(): Observable<boolean>;

  /**
   * Updates the state of the ASM UI
   */
  abstract updateAsmUiState(asmUi: AsmUi): void;

  /**
   * Get the state of the ASM UI
   */
  abstract getAsmUiState(): Observable<AsmUi>;

  abstract fetchCustomer360Data(
    queries: Array<AsmCustomer360Query>,
    options: AsmCustomer360Params
  ): void;

  abstract getCustomer360Data(): Observable<AsmCustomer360Response>;
}
