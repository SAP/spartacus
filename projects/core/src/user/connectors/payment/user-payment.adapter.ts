/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/payment.model';

export abstract class UserPaymentAdapter {
  abstract loadAll(userId: string): Observable<PaymentDetails[]>;

  abstract delete(userId: string, paymentMethodID: string): Observable<{}>;

  abstract setDefault(userId: string, paymentMethodID: string): Observable<{}>;
}
