/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  LoginForm,
  VerificationToken,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { UserAccountConnector } from '../connectors';

@Injectable()
export class VerificationTokenService implements VerificationTokenFacade {
  protected createVerificationTokenCommand: Command<
    { form: LoginForm },
    VerificationToken
  > = this.command.create(({ form }) =>
    this.connector.createVerificationToken(form)
  );

  constructor(
    protected connector: UserAccountConnector,
    protected command: CommandService
  ) {}

  /**
   * create verification token
   */
  createVerificationToken(form: LoginForm): Observable<VerificationToken> {
    return this.createVerificationTokenCommand.execute({ form });
  }
}
