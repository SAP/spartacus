import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { Converter } from '../../../../../../../../../projects/core/src/util/converter.service';
import { OrderApprovalDecision } from '../../../../../../../../../projects/core/src/model/order-approval.model';

@Injectable()
export class OccOrderApprovalDecisionNormalizer
  implements Converter<Occ.OrderApprovalDecision, OrderApprovalDecision> {
  constructor() {}

  convert(
    source: Occ.OrderApprovalDecision,
    target?: OrderApprovalDecision
  ): OrderApprovalDecision {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
