/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AsmCustomer360Facade,
  AsmCustomer360Query,
  AsmCustomer360Request,
  AsmCustomer360Response,
  AsmCustomer360TabComponent,
} from '@spartacus/asm/customer-360/root';
import { Command, CommandService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { AsmCustomer360Connector } from '../connectors/asm-customer-360.connector';

@Injectable()
export class AsmCustomer360Service implements AsmCustomer360Facade {
  protected customer360Command$: Command<
    Array<AsmCustomer360TabComponent>,
    AsmCustomer360Response
  >;

  constructor(
    protected commandService: CommandService,
    protected customer360Connector: AsmCustomer360Connector,
    protected userAccountFacade: UserAccountFacade
  ) {
    this.customer360Command$ = this.commandService.create((tabComponents) => {
      return this.userAccountFacade.get().pipe(
        take(1),
        concatMap((customer) => {
          const queries = tabComponents.reduce(
            (requests: Array<AsmCustomer360Query>, component) => {
              if (component.requestData) {
                return requests.concat(component.requestData);
              }
              return requests;
            },
            []
          );

          if (queries.length > 0) {
            const request: AsmCustomer360Request = {
              queries,
              options: {
                userId: customer?.customerId ?? '',
              },
            };
            return this.customer360Connector.getCustomer360Data(request);
          } else {
            return of({
              value: [],
            });
          }
        })
      );
    });
  }

  get360Data(
    components: Array<AsmCustomer360TabComponent>
  ): Observable<AsmCustomer360Response | undefined> {
    return this.customer360Command$.execute(components);
  }
}
