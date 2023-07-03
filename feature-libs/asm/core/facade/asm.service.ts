/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AsmUi,
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
  constructor(protected store: Store<StateWithAsm>) {}

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
   * Search for customers in a customer list
   */
  customerListCustomersSearch(options: CustomerSearchOptions): void {
    this.store.dispatch(new AsmActions.CustomerListCustomersSearch(options));
  }

  /**
   * Returns the customer search result data for a customer list
   */
  getCustomerListCustomersSearchResults(): Observable<CustomerSearchPage> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerListCustomersSearchResults)
    );
  }

  /**
   * Returns the customer list customers search result loading status.
   */
  getCustomerListCustomersSearchResultsLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerListCustomersSearchResultsLoading)
    );
  }

  /**
   * Returns the customer list customers search result error status.
   */
  getCustomerListCustomersSearchResultsError(): Observable<boolean> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerListCustomersSearchResultsError)
    );
  }

  /**
   * Reset the customer list customers search result data to the initial state.
   */
  customerListCustomersSearchReset(): void {
    this.store.dispatch(new AsmActions.CustomerListCustomersSearchReset());
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
