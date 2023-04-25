/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Customer360Facade,
  Customer360Query,
  Customer360Request,
  Customer360Response,
  Customer360TabComponent,
} from '@spartacus/asm/customer-360/root';
import { Command, CommandService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { Customer360Connector } from '../connectors/customer-360.connector';

@Injectable()
export class Customer360Service implements Customer360Facade {
  protected customer360Command$: Command<
    Array<Customer360TabComponent>,
    Customer360Response
  >;

  constructor(
    protected commandService: CommandService,
    protected customer360Connector: Customer360Connector,
    protected userAccountFacade: UserAccountFacade
  ) {
    this.customer360Command$ = this.commandService.create((tabComponents) => {
      return this.userAccountFacade.get().pipe(
        take(1),
        concatMap((customer) => {
          const queries = tabComponents.reduce(
            (requests: Array<Customer360Query>, component) => {
              if (component.requestData) {
                return requests.concat(component.requestData);
              }
              return requests;
            },
            []
          );

          if (queries.length > 0) {
            const request: Customer360Request = {
              queries,
              options: {
                userId: customer?.uid ?? '',
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
    components: Array<Customer360TabComponent>
  ): Observable<Customer360Response | undefined> {
    return this.customer360Command$.execute(components);
  }
}
