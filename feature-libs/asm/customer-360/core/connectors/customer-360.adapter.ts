/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Customer360Request,
  Customer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';

export abstract class Customer360Adapter {
  /**
   * Fetches data needed for certain ASM components.
   */
  abstract getCustomer360Data(
    request: Customer360Request
  ): Observable<Customer360Response>;
}
