/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BindCartParams,
  CustomerListsPage,
  CustomerRegistrationForm,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  /**
   * Abstract function used to get customer lists.
   */
  abstract customerLists(): Observable<CustomerListsPage>;

  /**
   * Used to bind an anonymous cart to a registered user.
   */
  abstract bindCart(options: BindCartParams): Observable<unknown>;

  /**
   * Abstract function used to create an account for customers.
   */
  abstract createCustomer(user: CustomerRegistrationForm): Observable<User>;
}
