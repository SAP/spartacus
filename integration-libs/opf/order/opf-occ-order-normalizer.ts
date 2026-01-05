/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OpfOccOrder } from './model';

@Injectable({ providedIn: 'root' })
export class OpfOccOrderNormalizer implements Converter<OpfOccOrder, Order> {
  convert(source: OpfOccOrder, target?: Order): Order {
    if (target === undefined) {
      target = { ...(source as any) } as Order;
    }

    if (source.sapBillingAddress && !target.paymentInfo?.billingAddress) {
      target.paymentInfo = {
        ...target.paymentInfo,
        billingAddress: source.sapBillingAddress,
      };
    }

    return target;
  }
}
