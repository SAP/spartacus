/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import { ORDER_APPROVAL_NORMALIZER } from '../../core/connectors/converters';
import { OrderApproval } from '../../core/model/order-approval.model';

@Injectable({
  providedIn: 'root',
})
export class OccOrderApprovalListNormalizer
  implements Converter<Occ.OrderApprovalsList, EntitiesModel<OrderApproval>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrderApprovalsList,
    target?: EntitiesModel<OrderApproval>
  ): EntitiesModel<OrderApproval> {
    if (target === undefined) {
      target = { ...(source as any) } as EntitiesModel<OrderApproval>;
    }
    target.values =
      source.orderApprovals?.map((orderApproval) => ({
        ...this.converter.convert(orderApproval, ORDER_APPROVAL_NORMALIZER),
      })) ?? [];
    return target;
  }
}
