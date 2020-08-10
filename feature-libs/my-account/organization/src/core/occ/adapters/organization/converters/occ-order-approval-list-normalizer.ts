import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { ORDER_APPROVAL_NORMALIZER } from '../../../../connectors/order-approval/converters';
import { EntitiesModel } from '../../../../../../../../../projects/core/src/model/misc.model';
import { OrderApproval } from '../../../../../../../../../projects/core/src/model/order-approval.model';

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
