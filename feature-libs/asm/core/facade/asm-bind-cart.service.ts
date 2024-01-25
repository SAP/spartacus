/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { AsmConnector } from '../connectors';

@Injectable()
export class AsmBindCartService implements AsmBindCartFacade {
  constructor(
    protected commandService: CommandService,
    protected asmConnector: AsmConnector,
    protected userAccountFacade: UserAccountFacade
  ) {}

  protected bindCartCommand$: Command<string, unknown> =
    this.commandService.create((cartId) =>
      this.userAccountFacade.get().pipe(
        map((user) => {
          if (user?.uid) {
            return user.uid;
          } else {
            throw new Error('No identifier for authenticated user found.');
          }
        }),
        take(1),
        concatMap((customerId) =>
          this.asmConnector.bindCart({
            cartId,
            customerId,
          })
        )
      )
    );

  bindCart(cartId: string): Observable<unknown> {
    return this.bindCartCommand$.execute(cartId);
  }
}
