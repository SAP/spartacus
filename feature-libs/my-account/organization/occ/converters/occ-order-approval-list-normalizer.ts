import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import {
  OrderApproval,
  ORDER_APPROVAL_NORMALIZER,
} from '@spartacus/my-account/organization/core';

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
