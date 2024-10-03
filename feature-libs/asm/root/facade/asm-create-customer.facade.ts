/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { CustomerRegistrationForm } from '../model/create-customer.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmCreateCustomerFacade,
      feature: ASM_FEATURE,
      methods: ['createCustomer'],
    }),
})
export abstract class AsmCreateCustomerFacade {
  abstract createCustomer(user: CustomerRegistrationForm): Observable<User>;
}
