/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CancellationDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

export abstract class CancelServiceOrderAdapter {
  abstract cancelServiceOrder(
    userId: string,
    code: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown>;
}
