/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { CustomerSearchOptions, CustomerSearchPage } from '../model/asm.models';
import { CustomerListsPage } from '../model/customer-list.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmCustomerListFacade,
      feature: ASM_FEATURE,
      methods: [
        'getCustomerLists',
        'getCustomerListsState',
        'customerListCustomersSearch',
        'getCustomerListCustomersSearchResults',
        'getCustomerListCustomersSearchResultsLoading',
        'customerListCustomersSearchReset',
        'getCustomerListCustomersSearchResultsError',
      ],
    }),
})
export abstract class AsmCustomerListFacade {
  abstract getCustomerLists(): Observable<CustomerListsPage | undefined>;
  abstract getCustomerListsState(): Observable<QueryState<CustomerListsPage>>;
  abstract customerListCustomersSearch(options: CustomerSearchOptions): void;
  abstract getCustomerListCustomersSearchResults(): Observable<CustomerSearchPage>;
  abstract getCustomerListCustomersSearchResultsLoading(): Observable<boolean>;
  abstract customerListCustomersSearchReset(): void;
  abstract getCustomerListCustomersSearchResultsError(): Observable<boolean>;
}
