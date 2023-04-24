/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AsmCreateCustomerFacade,
  CustomerRegistrationForm,
} from '@spartacus/asm/root';
import { Command, CommandService, User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';

@Injectable()
export class AsmCreateCustomerService implements AsmCreateCustomerFacade {
  protected createCustomerCommand: Command<
    { user: CustomerRegistrationForm },
    User
  > = this.command.create(({ user }) => this.asmConnector.createCustomer(user));

  constructor(
    protected asmConnector: AsmConnector,
    protected command: CommandService
  ) {}

  createCustomer(user: CustomerRegistrationForm): Observable<User> {
    return this.createCustomerCommand.execute({ user });
  }
}
