/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CartAccessCodeFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, QueryService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartAccessCodeConnector } from '../connectors';

@Injectable()
export class CartAccessCodeService implements CartAccessCodeFacade {
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected cartAccessCodeConnector = inject(CartAccessCodeConnector);

  protected getCartAccessCodeCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    string | undefined
  > = this.commandService.create(({ userId, cartId }) =>
    this.cartAccessCodeConnector.getCartAccessCode(userId, cartId)
  );

  getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.getCartAccessCodeCommand.execute({ userId, cartId });
  }
}
