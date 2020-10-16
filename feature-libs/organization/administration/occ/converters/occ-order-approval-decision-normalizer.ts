import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { OrderApprovalDecision } from '@spartacus/organization/administration/core';

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
