import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  ORDER_NORMALIZER,
} from '@spartacus/core';
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
      target = { ...(source as any) };
    }
    if (source.order) {
      target.order = this.converter.convert(source.order, ORDER_NORMALIZER);
    }
    return target;
  }
}
