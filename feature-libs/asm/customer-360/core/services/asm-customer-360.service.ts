/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  protected commandService = inject(CommandService);
  protected asmCustomer360Connector = inject(AsmCustomer360Connector);
  protected userAccountFacade = inject(UserAccountFacade);

  protected asmCustomer360Command$: Command<
    Array<AsmCustomer360TabComponent>,
    AsmCustomer360Response
  >;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.asmCustomer360Command$ = this.commandService.create(
      (tabComponents) => {
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
              return this.asmCustomer360Connector.getAsmCustomer360Data(
                request
              );
            } else {
              return of({
                value: [],
              });
            }
          })
        );
      }
    );
  }

  get360Data(
    components: Array<AsmCustomer360TabComponent>
  ): Observable<AsmCustomer360Response | undefined> {
    return this.asmCustomer360Command$.execute(components);
  }
}
