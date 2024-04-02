/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, ConverterService, Occ } from '@spartacus/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OrderApproval } from '../../core/model/order-approval.model';

@Injectable({
  providedIn: 'root',
})
export class OccOrderApprovalNormalizer
  implements Converter<Occ.OrderApproval, OrderApproval>
{
  constructor(private converter: ConverterService) {}

  convert(source: Occ.OrderApproval, target?: OrderApproval): OrderApproval {
    if (target === undefined) {
      target = { ...(source as any) } as OrderApproval;
    }
    if (source.order) {
      target.order = this.converter.convert(source.order, ORDER_NORMALIZER);
    }
    return target;
  }
}
