/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { CustomerListsPage } from '../model/customer-list.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmCustomerListFacade,
      feature: ASM_FEATURE,
      methods: ['getCustomerLists', 'getCustomerListsState'],
    }),
})
export abstract class AsmCustomerListFacade {
  abstract getCustomerLists(): Observable<CustomerListsPage | undefined>;
  abstract getCustomerListsState(): Observable<QueryState<CustomerListsPage>>;
}
