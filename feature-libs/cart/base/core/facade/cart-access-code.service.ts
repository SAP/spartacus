/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartAccessCodeFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, QueryService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartAccessCodeConnector } from '../connectors';

@Injectable()
export class CartAccessCodeService implements CartAccessCodeFacade {
  protected getCartAccessCodeCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    string | undefined
  > = this.commandService.create(({ userId, cartId }) =>
    this.cartAccessCodeConncector.getCartAccessCode(userId, cartId)
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected cartAccessCodeConncector: CartAccessCodeConnector
  ) {}

  getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.getCartAccessCodeCommand.execute({ userId, cartId });
  }
}
