/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Asm360Facade,
  AsmCustomer360Query,
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/root';
import { Query, QueryService, QueryState } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AsmConfig } from '../config/asm-config';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class Asm360Service implements Asm360Facade {
  protected customer360Query$: Query<AsmCustomer360Response>;
  protected customer360Queries$: Array<Query<AsmCustomer360Response>>;

  constructor(
    protected asmConfig: AsmConfig,
    protected queryService: QueryService,
    protected asmConnector: AsmConnector,
    protected userAccountFacade: UserAccountFacade
  ) {
    this.userAccountFacade
      .get()
      .pipe(take(1))
      .subscribe((customer) => {
        this.customer360Queries$ =
          asmConfig.asm?.customer360?.tabs?.map((tab) => {
            const queries = tab.components.reduce(
              (requests: Array<AsmCustomer360Query>, component) => {
                if (component.requestData) {
                  return requests.concat(component.requestData);
                }
                return requests;
              },
              []
            );

            const request: AsmCustomer360Request = {
              queries,
              options: {
                userId: customer?.customerId ?? '',
              },
            };

            return this.queryService.create(() =>
              this.asmConnector.getCustomer360Data(request)
            );
          }) ?? [];
      });
  }

  get360Data(
    index: number
  ): Observable<AsmCustomer360Response | undefined> | undefined {
    return this.customer360Queries$[index]?.get();
  }

  get360DataState(
    index: number
  ): Observable<QueryState<AsmCustomer360Response>> | undefined {
    return this.customer360Queries$[index]?.getState();
  }
}
