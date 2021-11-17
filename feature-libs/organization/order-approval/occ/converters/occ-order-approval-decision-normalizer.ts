import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { OrderApprovalDecision } from '../../core/model/order-approval.model';

@Injectable({
  providedIn: 'root',
})
export class OccOrderApprovalDecisionNormalizer
  implements Converter<Occ.OrderApprovalDecision, OrderApprovalDecision>
{
  constructor() {}

  convert(
    source: Occ.OrderApprovalDecision,
    target?: OrderApprovalDecision
  ): OrderApprovalDecision {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
