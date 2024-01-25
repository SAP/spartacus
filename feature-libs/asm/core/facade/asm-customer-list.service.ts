/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AsmCustomerListFacade,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Query, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/index';

@Injectable()
export class AsmCustomerListService implements AsmCustomerListFacade {
  protected customerListQuery$: Query<CustomerListsPage> =
    this.queryService.create(() => this.asmConnector.customerLists(), {
      reloadOn: undefined,
      resetOn: undefined,
    });

  constructor(
    protected queryService: QueryService,
    protected asmConnector: AsmConnector,
    protected store: Store<StateWithAsm>
  ) {}

  getCustomerLists(): Observable<CustomerListsPage | undefined> {
    return this.customerListQuery$.get();
  }

  getCustomerListsState(): Observable<QueryState<CustomerListsPage>> {
    return this.customerListQuery$.getState();
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
   * Reset the customer list customers search result data to the initial state.
   */
  customerListCustomersSearchReset(): void {
    this.store.dispatch(new AsmActions.CustomerListCustomersSearchReset());
  }

  /**
   * Returns the customer list customers search result error status.
   */
  getCustomerListCustomersSearchResultsError(): Observable<boolean> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerListCustomersSearchResultsError)
    );
  }
}
