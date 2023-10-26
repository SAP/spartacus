/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';

export abstract class AsmCustomer360Adapter {
  /**
   * Fetches data needed for certain ASM components.
   */
  abstract getAsmCustomer360Data(
    request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response>;
}
