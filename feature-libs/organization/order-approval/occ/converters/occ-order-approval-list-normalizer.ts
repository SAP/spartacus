import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import { OrderApproval } from '../../core/model/order-approval.model';
import { ORDER_APPROVAL_NORMALIZER } from '../../core/connectors/converters';

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
      target = { ...(source as any) };
    }
    target.values = source.orderApprovals.map((orderApproval) => ({
      ...this.converter.convert(orderApproval, ORDER_APPROVAL_NORMALIZER),
    }));
    return target;
  }
}
