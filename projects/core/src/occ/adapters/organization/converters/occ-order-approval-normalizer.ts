import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { OrderApproval } from '../../../../model/order-approval.model';

@Injectable()
export class OccOrderApprovalNormalizer
  implements Converter<Occ.OrderApproval, OrderApproval> {
  convert(source: Occ.OrderApproval, target?: OrderApproval): OrderApproval {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
