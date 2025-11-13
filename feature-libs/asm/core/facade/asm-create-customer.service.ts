/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  AsmCreateCustomerFacade,
  CustomerRegistrationForm,
} from '@spartacus/asm/root';
import { Command, CommandService, User } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';

@Injectable()
export class AsmCreateCustomerService implements AsmCreateCustomerFacade {
  protected asmConnector = inject(AsmConnector);
  protected command = inject(CommandService);

  protected createCustomerCommand: Command<
    { user: CustomerRegistrationForm },
    User
  > = this.command.create(({ user }) => this.asmConnector.createCustomer(user));

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  createCustomer(user: CustomerRegistrationForm): Observable<User> {
    return this.createCustomerCommand.execute({ user });
  }
}
