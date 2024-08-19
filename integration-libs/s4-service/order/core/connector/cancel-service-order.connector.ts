/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CancelServiceOrderAdapter } from './cancel-service-order.adapter';
import { CancellationDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

@Injectable()
export class CancelServiceOrderConnector {
  protected cancelServiceOrderAdapter = inject(CancelServiceOrderAdapter);

  cancelServiceOrder(
    userId: string,
    code: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown> {
    return this.cancelServiceOrderAdapter.cancelServiceOrder(
      userId,
      code,
      cancellationDetails
    );
  }
}
