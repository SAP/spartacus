/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  protected connector = inject(UserAccountConnector);
  protected command = inject(CommandService);

  protected createVerificationTokenCommand: Command<
    { verificationTokenCreation: VerificationTokenCreation },
    VerificationToken
  > = this.command.create(({ verificationTokenCreation }) =>
    this.connector.createVerificationToken(verificationTokenCreation)
  );

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
