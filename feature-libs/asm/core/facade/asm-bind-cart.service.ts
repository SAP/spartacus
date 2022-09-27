/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import {
  Command,
  CommandService,
  isNotUndefined,
  UserIdService,
} from '@spartacus/core';
import { iif, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AsmConnector } from '../connectors';

@Injectable()
export class AsmBindCartService implements AsmBindCartFacade {
  constructor(
    protected commandService: CommandService,
    protected asmConnector: AsmConnector,
    protected userIdService: UserIdService
  ) {}

  protected bindCartCommand$: Command<
    { cartId: string; userId?: string },
    unknown
  > = this.commandService.create(
    ({ cartId, userId }: { cartId: string; userId?: string }) =>
      iif(
        () => isNotUndefined(userId),
        of(userId as string),
        this.userIdService.takeUserId(true)
      ).pipe(
        concatMap((customerId) =>
          this.asmConnector.bindCart({
            cartId,
            customerId,
          })
        )
      )
  );

  bindCart(cartId: string, userId?: string): Observable<unknown> {
    return this.bindCartCommand$.execute({ cartId, userId });
  }
}
