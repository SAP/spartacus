/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BindCartParams, CustomerListsPage } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
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
}
