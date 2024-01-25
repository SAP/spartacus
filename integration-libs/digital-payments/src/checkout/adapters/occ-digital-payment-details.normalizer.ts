/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccDpDetailsNormalizer
  implements Converter<Occ.PaymentDetails, PaymentDetails>
{
  convert(source: Occ.PaymentDetails, target: PaymentDetails): PaymentDetails {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
