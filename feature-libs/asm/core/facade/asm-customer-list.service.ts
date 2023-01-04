/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmCustomerListFacade, CustomerListsPage } from '@spartacus/asm/root';
import { Query, QueryService, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class AsmCustomerListService implements AsmCustomerListFacade {
  protected customerListQuery$: Query<CustomerListsPage> =
    this.queryService.create(() => this.asmConnector.customerLists(), {
      reloadOn: undefined,
      resetOn: undefined,
    });

  constructor(
    protected queryService: QueryService,
    protected asmConnector: AsmConnector
  ) {}

  getCustomerLists(): Observable<CustomerListsPage | undefined> {
    return this.customerListQuery$.get();
  }

  getCustomerListsState(): Observable<QueryState<CustomerListsPage>> {
    return this.customerListQuery$.getState();
  }
}
