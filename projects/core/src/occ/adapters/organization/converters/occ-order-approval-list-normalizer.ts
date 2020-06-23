import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { ORDER_APPROVAL_NORMALIZER } from '../../../../organization/connectors/order-approval/converters';
import { EntitiesModel } from '../../../../model/misc.model';
import { OrderApproval } from '../../../../model/order-approval.model';

@Injectable()
export class OccOrderApprovalListNormalizer
  implements Converter<Occ.OrderApprovalsList, EntitiesModel<OrderApproval>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrderApprovalsList,
    target?: EntitiesModel<OrderApproval>
  ): EntitiesModel<OrderApproval> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orderApprovals.map((orderApproval) => ({
          ...this.converter.convert(orderApproval, ORDER_APPROVAL_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
