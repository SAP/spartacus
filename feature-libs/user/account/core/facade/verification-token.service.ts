/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  VerificationToken,
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { UserAccountConnector } from '../connectors';

@Injectable()
export class VerificationTokenService implements VerificationTokenFacade {
  protected createVerificationTokenCommand: Command<
    { verificationTokenCreation: VerificationTokenCreation },
    VerificationToken
  > = this.command.create(({ verificationTokenCreation }) =>
    this.connector.createVerificationToken(verificationTokenCreation)
  );

  constructor(
    protected connector: UserAccountConnector,
    protected command: CommandService
  ) {}

  /**
   * create verification token
   */
  createVerificationToken(
    verificationTokenCreation: VerificationTokenCreation
  ): Observable<VerificationToken> {
    return this.createVerificationTokenCommand.execute({
      verificationTokenCreation,
    });
  }
}
