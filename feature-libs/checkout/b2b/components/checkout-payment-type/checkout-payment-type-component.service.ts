/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CheckoutPaymentTypeComponentService {
  isPONumberReadOnly(): Observable<boolean> {
    return of(false);
  }
}
