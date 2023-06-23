/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService, QueryService } from '@spartacus/core';

import { OpfOtpFacade } from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OtpConnector } from '../connectors/otp.connector';

@Injectable()
export class OpfOtpService implements OpfOtpFacade {
  protected generateOtpKeyCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    string | undefined
  > = this.commandService.create(({ userId, cartId }) =>
    this.otpConnector.generateOtpKey(userId, cartId)
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected otpConnector: OtpConnector
  ) {}

  generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.generateOtpKeyCommand.execute({ userId, cartId });
  }
}
